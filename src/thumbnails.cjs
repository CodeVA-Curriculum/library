var fs = require('fs')
var env = require('env')
    request = require('request');
    var path = require('path')
    var os = require('os')
    const {google} = require('googleapis');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
async function getIds() {
    const res = await (await fetch('https://curriculum.codevirginia.org/api/library/all.json')).json()
    let ids = []
    for(const el of res) {
        // only get the thumbnail if the file isn't a "group"
        // if(el.links.drive == "https://docs.google.com/document/d/1CPYR86AiX5Oy6Ie53mzhAqwXwBhXHRLxWMY2pea1zBk/edit?usp=drive_link")
        if(!el.contents && el.links.drive && el.links.drive.includes('/d/')) {
            let id = el.links.drive.substring(el.links.drive.indexOf('/d/') + 3)
            id = id.substring(0, id.indexOf('/'))
            if(id.length > 0) {
                ids.push(id)
            }
        }
    }
    return ids
}

async function getThumbnails(ids) {
    for(const id of ids) {
        console.log("downloading" + id)
        download(`https://drive.google.com/thumbnail?sz=w640&id=${id}`, `../images/thumbnails/${id}.png`, function () {
            console.log(`Got thumbnail for ${id}`)
        })
    }
}

async function getFile(id) {
    download(`https://drive.google.com/thumbnail?sz=w640&id=${id}`, `./static/thumbnails/${id}.png`, function () {
        console.log(`Got thumbnail for ${id}`)
    })
}

async function main() {
    const files = await getIds()
    // for(const file of files) {
    //     if(file == "1pJcVTPSp0IOIFhm4MMoWscCbPqP8arnM") {
    //         console.log("PDF test passed!")
    //     }
    //     if( file == "1CPYR86AiX5Oy6Ie53mzhAqwXwBhXHRLxWMY2pea1zBk") {
    //         console.log("Doc test passed!")
    //     }
    // }
    // console.log(files)
    getThumbnails(files)
    // getFile("11kOGV1Oh2A9tRXDm4lwY5cU41lamSAsHYFP3cIP73Sc")
  //   const auth = new google.auth.GoogleAuth({
  //   keyfilePath: path.join(__dirname, 'scripts/client_secret.json'),
  //   scopes: 'https://www.googleapis.com/auth/drive.readonly',
  // });
  // const client = await auth.getClient();
  // google.options({auth: client});
  // 
  //   const drive = google.drive({version: 'v3', auth: env.DRIVE_API_KEY});
  //   const fileId = '1EkgdLY3T-_9hWml0VssdDWQZLEc8qqpMB77Nvsx6khA';
  // const destPath = path.join(os.tmpdir(), 'important.zip');
  // const dest = fs.createWriteStream(destPath);
  // const res = await drive.files.export(
  //   {fileId, mimeType: 'application/zip'},
  //   {responseType: 'stream'},
  // );
  // await new Promise((resolve, reject) => {
  //   res.data
  //     .on('error', reject)
  //     .pipe(dest)
  //     .on('error', reject)
  //     .on('finish', resolve);
  // });
}

main()
