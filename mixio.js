const forever = require("forever")
const args = process.argv.slice(2)
const fs = require("fs")
var versionInfo = fs.readFileSync("version.json", "utf-8")
var configInfo = fs.readFileSync("src/config.json", "utf-8")
var http = require("http")
var {spawnSync} = require("child_process")
var version = function () {
    console.log(JSON.parse(versionInfo))
}
var config = function () {
    console.log(JSON.parse(configInfo))
}
var spawnTime = new Date(new Date().toLocaleString("en-US", {
    timeZone: "Asia/Shanghai"
}))
var logFileName = [
    [spawnTime.getFullYear(), spawnTime.getMonth() + 1, spawnTime.getDate()].join("-"), [spawnTime.getHours() >= 10 ? spawnTime.getHours() : ("0" + spawnTime.getHours()), spawnTime.getMinutes() >= 10 ? spawnTime.getMinutes() : ("0" + spawnTime.getMinutes()), spawnTime.getSeconds() >= 10 ? spawnTime.getSeconds() : ("0" + spawnTime.getSeconds())].join("-")
].join("-") + ".log"
if (args.length != 1) {
    console.log("Invalid parameter(s). Use \"mixio help\" for help.")
} else {
    if (args[0] == "start")
        start()
    else if (args[0] == "stop")
        stop()
    else if (args[0] == "debug")
        debug()
    else if (args[0] == "update")
        update()
    else if (args[0] == "help")
        help()
    else if (args[0] == "version")
        version()
    else if (args[0] == "config")
        config()
    else
        console.log("Invalid parameter(s). Use \"mixio help\" for help.")
}

function start() {
    if(process.platform=="linux")
        fs.chmodSync("src/loader","0755")
    forever.startDaemon("", {
        'max': 1,
        'silent': false,
        'sourceDir': process.cwd() + "/src/",
        'cwd': process.cwd() + "/src/",
        'logFile': process.cwd() + "/logs/" + logFileName,
        'command': "./loader"
    })
    console.log("Starting MixIO server...")
    while (true) {
        var content = fs.readFileSync(process.cwd() + "/logs/" + logFileName, "utf-8")
        var successLog = "[INFO] Database Connected!"
        var errorLog = "Error"
        if (content != "") {
            if (content.indexOf(errorLog) != -1) {
                console.log(content)
                console.error("An error occured while initializing MixIO server. Log file: " + process.cwd() + "/logs/" + logFileName)
                break
            } else if (content.indexOf(successLog) != -1) {
                console.log(content)
                console.log("MixIO server is running now.")
                break
            }
        }
    }
}

function stop() {
    forever.stopAll().on('stopAll', function () {
        console.log("MixIO server exited.")
    }).on('error', function () {
        console.log("No running MixIO servers could be found.")
    })
}

function debug() {
    forever.startDaemon("loader.js", {
        'max': 1,
        'silent': false,
        'sourceDir': process.cwd() + "/src/",
        'cwd': process.cwd() + "/src/",
        'logFile': process.cwd() + "/logs/" + logFileName,
        'command': "node"
    })
    console.log("Starting MixIO server...")
    while (true) {
        var content = fs.readFileSync(process.cwd() + "/logs/" + logFileName, "utf-8")
        var successLog = "[INFO] Database Connected!"
        var errorLog = "Error"
        if (content != "") {
            if (content.indexOf(errorLog) != -1) {
                console.log(content)
                console.error("An error occured while initializing MixIO server. Log file: " + process.cwd() + "/logs/" + logFileName)
                break
            } else if (content.indexOf(successLog) != -1) {
                console.log(content)
                console.log("MixIO server is running now.")
                break
            }
        }
    }
}

function update() {
    console.log("Shutting down MixIO server...")
    stop()
    console.log("Fetching update info...")
    http.get("http://mixio.mixly.cn/developers/update/" + JSON.parse(versionInfo)["platform"] + "/index.php", (res) => {
        if(res.statusCode==200)
        {
            var data = "";
            //res.setEncoding("binary");
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("error",(e)=>{
                console.log(e)
            })
            res.on('end', () => {
                if(data.split(",").length == 2)
                {
                    var latestVersion = data.split(",")[0].split("=")[1]
                    var leastVersion = data.split(",")[1].split("=")[1]
                    var currentVersion = JSON.parse(versionInfo)["version"]
                    var compareLeast = versionCompare(currentVersion,leastVersion)
                    var compareLatest = versionCompare(latestVersion,currentVersion)
                    if(compareLeast==-2)
                        console.log("Illegal version info received.")    
                    else if(compareLeast>=0)
                    {
                        if(compareLatest>0)
                        {
                            var fileName = "loader"
                            if(process.platform=="win32")
                                fileName = "loader.exe"
                            http.get("http://mixio.mixly.cn/developers/update/" + JSON.parse(versionInfo)["platform"] + "/" + fileName, (res) => {
                                if(res.statusCode=="200")
                                {
                                    var data = "";
                                    var fullLength = res.headers['content-length']
                                    res.setEncoding("binary");
                                    var lastProgress = 0
                                    res.on("data", function (chunk) {
                                        data += chunk;
                                        if(parseInt((data.length/fullLength).toFixed(2)*100)>lastProgress)
                                        {
                                            lastProgress = parseInt((data.length/fullLength).toFixed(2)*100)
                                            console.log("Updating: "+parseInt((data.length/fullLength).toFixed(2)*100)+"%")
                                        }
                                    });
                                    res.on("error",(e)=>{
                                        console.log(e)
                                    })
                                    res.on("end",function(){
                                        try{
                                            if(process.platform=="win32")
                                                fs.unlinkSync('src/loader.exe')
                                            else
                                                fs.unlinkSync('src/loader')
                                        }
                                        catch(e){

                                        }
                                        finally{
                                            if(process.platform=="win32")
                                                fs.writeFileSync('src/loader.exe',data,'binary')
                                            else
                                                fs.writeFileSync('src/loader',data,'binary')
                                            var newVersionInfo = JSON.parse(versionInfo)
                                            newVersionInfo["version"] = latestVersion
                                            fs.writeFileSync('version.json',JSON.stringify(newVersionInfo,null,4))
                                        }
                                    })
                                }
                                else
                                    console.log("Status code: "+res.statusCode)
                            })
                        }
                        else
                        {
                            console.log("Current version is up to date.")
                        }
                    }
                    else
                        console.log("The current version is far from outdated, please go to http://mixio.mixly.cn/developers to download it manually")
                }
                else
                    console.log("Illegal version info received.")
            })
        }
        else
            console.log("Status code: "+res.statusCode)
    })
}

function help() {
    var helpMessages = [
        "<command>     <description>",
        "start         Launch MixIO server",
        "stop          Stop MixIO server",
        "update        Update MixIO server",
        "version       View current version info",
        "config        View current config info"
    ]
    console.log(helpMessages.join('\n'))
}

function versionCompare(version1,version2)
{
    var version1Array = version1.split(".")
    var version2Array = version2.split(".")
    var result = 0
    if(version1Array.length == version2Array.length){
        for(i = 0;i<=version1Array.length-1;i = i+1)
        {
            if(version1Array[i]>version2Array[i])
            {
                result = 1
                break
            }
            else if(version1Array[i]<version2Array[i])
            {
                result = -1
                break
            }
        }
    }
    else
        result = -2
    return result
}