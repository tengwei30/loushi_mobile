var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var babelify = require('babelify')
var rgex = /^chunk-vendors\.[\w]/
var bableFileArray = []

// package
const pkg = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function getFiles(url, ext) {
  fs.readdir(url, function(err, files) {
    if (err) {
      return console.error(err, 'getFileNameError')
    }
    files.forEach(function(file) {
      fs.stat(url + file, (err, stats) => {
        if (stats && stats.isFile()) {
          if (path.extname(url + file) === ext) {
            if (rgex.test(file)) {
              bableFileArray.push(path.basename(file, ext))
              console.log(bableFileArray)
              compileJs(url)
            }
          }
        } else if (stats && stats.isDirectory()) {
          s
          getFiles(url + file + '/', ext)
        }
      })

    })
  })
}

// 查找是否含有版本文件夹
function dealFile(dir) {
  let url = null
  const list = fs.readdirSync(dir)
  if (list.length === 1) {
    url = `${dir}/${list[0]}/js/`
  } else {
    url = 'dist/Breader_Task_H5/js/'
  }
  getFiles(url, '.js')
}

dealFile('dist/Breader_Task_H5')
function compileJs(url) {
  browserify({ debug: true })
    .transform(babelify)
    .require(resolve(`/${url}/${bableFileArray[0]}.js`), { entry: true })
    .bundle(function(res) {
      console.log(res, 456)
      fs.unlink(resolve(`/${url}/${bableFileArray[0]}.js`), function(err) {
        try {
          var readerStream = fs.createReadStream(resolve(`/dist/${bableFileArray[0]}.js`))
          var writerStream = fs.createWriteStream(resolve(`/${url}/${bableFileArray[0]}.js`))
          readerStream.pipe(writerStream)
          console.log('结束')
          fs.unlink(resolve(`/dist/${bableFileArray[0]}.js`), function(errunlink) {
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
    .pipe(fs.createWriteStream(`dist/${bableFileArray[0]}.js`))
}

