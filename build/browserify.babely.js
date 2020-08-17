var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var babelify = require('babelify')
var rgex = /^(chunk-vendors)|(chunk-swiper)|(chunk-better-scroll)\.[\w]/
var bableFileArray = []
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function getFiles(url, ext) {
  fs.readdir(url, function(err, files) {
    if (err) {
      return console.error(err, 'getFileNameError')
    }
    files.forEach(function(file) {
      var stats = fs.statSync(url + file)
      if (stats && stats.isFile()) {
        if (path.extname(url + file) === ext) {
          if (rgex.test(path.basename(file, ext))) {
            bableFileArray.push(path.basename(file, ext))
          }
        }
      } else if (stats && stats.isDirectory()) {
        getFile(url + file + '/', ext)
      }

    })
    console.log(bableFileArray)
    compileJs()
  })
}
getFiles('dist/Breader_Task_H5/js/', '.js')
function compileJs() {
  bableFileArray.map(function(item) {
    dealCompile(item)
  })
}

function dealCompile(item) {
  browserify({ debug: false })
    .transform(babelify)
    .require(resolve(`/dist/Breader_Task_H5/js/${item}.js`), { entry: true })
    .bundle(function(res) {
      console.log(res, 456)
      fs.unlink(resolve(`/dist/Breader_Task_H5/js/${item}.js`), function(err) {
        try {
          var readerStream = fs.createReadStream(resolve(`/dist/${item}.js`))
          var writerStream = fs.createWriteStream(resolve(`/dist/Breader_Task_H5/js/${item}.js`))
          readerStream.pipe(writerStream)
          console.log('结束')
          fs.unlink(resolve(`/dist/${item}.js`), function(errunlink) {
            try {
              console.log('success delete')
            } catch (errortetx) {
              console.log(errunlink, errortetx, 'delecopyError')
            }
          })
        } catch (err) {
          console.log(err, 'deleteFileError')
        }
      })
    })
    .on('error', function(err) {
      console.log('Error' + err.message)
    })
    .pipe(fs.createWriteStream(`dist/${item}.js`))
}

