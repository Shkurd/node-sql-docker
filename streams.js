const fs = require('fs')
const zlib = require('zlib') // для сжатия

const readStream = fs.createReadStream('./files/bigtext.txt')
const writeStream = fs.createWriteStream('./files/new-bigtext.txt')
const writeStream2 = fs.createWriteStream('./files/new-bigtext2.txt')
const compressStream = zlib.createGzip() // лдя сжатия потока


const handleError = () => {
    console.log('error - somthing went wrong')
    readStream.destroy()
    writeStream.end('Finished with error')
}

// Поток на чтечние
readStream.on('data',(chank)=>{
    console.log(chank.toString())
})

// Поток на запись
readStream.on('data',(chank)=>{ // сначала читаем потока, потом пишем через writeStream
    writeStream.write(chank)
})

// поток на чтечние
readStream.on('data',(chank)=>{
    console.log(chank.toString())
})

// Дуплексный поток - на чтение и запись одновременно
readStream
.on('error', handleError)
.pipe(compressStream)
.pipe(writeStream2)
.on('error', handleError)
