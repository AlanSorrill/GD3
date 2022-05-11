/******/
(() => { // webpackBootstrap
        /******/
        "use strict";
        /******/
        var __webpack_modules__ = ({

                    /***/
                    "./srcFunctions/WPFunctions.ts":
                    /*!*************************************!*\
                      !*** ./srcFunctions/WPFunctions.ts ***!
                      \*************************************/
                    /***/
                        (function(__unused_webpack_module, exports, __webpack_require__) {


                        var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
                            if (k2 === undefined) k2 = k;
                            Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
                        }) : (function(o, m, k, k2) {
                            if (k2 === undefined) k2 = k;
                            o[k2] = m[k];
                        }));
                        var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
                            Object.defineProperty(o, "default", { enumerable: true, value: v });
                        }) : function(o, v) {
                            o["default"] = v;
                        });
                        var __importStar = (this && this.__importStar) || function(mod) {
                            if (mod && mod.__esModule) return mod;
                            var result = {};
                            if (mod != null)
                                for (var k in mod)
                                    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
                            __setModuleDefault(result, mod);
                            return result;
                        };
                        var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
                            function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
                            return new(P || (P = Promise))(function(resolve, reject) {
                                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

                                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

                                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                                step((generator = generator.apply(thisArg, _arguments || [])).next());
                            });
                        };
                        var __importDefault = (this && this.__importDefault) || function(mod) {
                            return (mod && mod.__esModule) ? mod : { "default": mod };
                        };
                        Object.defineProperty(exports, "__esModule", ({ value: true }));
                        exports.HashTypes = exports.Diseases = exports.DataExists = exports.Data = exports.WonderProxy = exports.RonaTest = exports.ReqTest = exports.listener = void 0;
                        const functions = __importStar(__webpack_require__( /*! firebase-functions */ "firebase-functions"));
                        const node_fetch_1 = __importDefault(__webpack_require__( /*! node-fetch */ "node-fetch"));
                        const fs = __importStar(__webpack_require__( /*! fs */ "fs"));
                        const path = __importStar(__webpack_require__( /*! path */ "path"));
                        __webpack_require__( /*! ./common/FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
                        const WonderData_1 = __webpack_require__( /*! ./common/WonderData */ "./srcFunctions/common/WonderData.ts");
                        const child_process_1 = __webpack_require__( /*! child_process */ "child_process");
                        const crypto = __importStar(__webpack_require__( /*! crypto */ "crypto"));
                        const WonderDataImports_1 = __webpack_require__( /*! ./common/WonderData/WonderDataImports */ "./srcFunctions/common/WonderData/WonderDataImports.ts");
                        const app_1 = __webpack_require__( /*! firebase-admin/app */ "firebase-admin/app");
                        const FirebaseStorage = __importStar(__webpack_require__( /*! firebase-admin/storage */ "firebase-admin/storage"));
                        // // Start writing Firebase Functions
                        // // https://firebase.google.com/docs/functions/typescript
                        const firebaseAdminCreds_1 = __webpack_require__( /*! ./firebaseAdminCreds */ "./srcFunctions/firebaseAdminCreds.ts");
                        (0, app_1.initializeApp)({
                            credential: (0, app_1.cert)(firebaseAdminCreds_1.FirebaseServiceAccountCreds),
                            storageBucket: 'gs://gdsn3-22.appspot.com'
                        });
                        let firebaseStorage = FirebaseStorage.getStorage();
                        let bucket = firebaseStorage.bucket();
                        //
                        console.log('test');
                        let database = new WonderDataImports_1.Database({
                            readFile(filePath) {
                                return __awaiter(this, void 0, void 0, function*() {
                                    if (filePath.startsWith('./')) {
                                        filePath = filePath.substring(2);
                                    }
                                    if (filePath.startsWith('/')) {
                                        filePath = filePath.substring(1);
                                    }
                                    let absPath = path.resolve(__dirname, `../data/`, filePath);
                                    let reference = bucket.file("data/" + filePath);
                                    if (!(yield reference.exists())) { //(!fs.existsSync(absPath)) {
                                        return { error: `File doesn't exist: ${absPath}` };
                                    }
                                    // let data = await fs.promises.readFile(absPath)
                                    // return JSON.parse(data.toString())
                                    let [buffer] = yield reference.download();
                                    let result = buffer.toString();
                                    return JSON.parse(result);
                                });
                            },
                            writeFile(filePath, data) {
                                return __awaiter(this, void 0, void 0, function*() {
                                    if (filePath.startsWith('./')) {
                                        filePath = filePath.substring(2);
                                    }
                                    if (filePath.startsWith('/')) {
                                        filePath = filePath.substring(1);
                                    }
                                    let absPath = path.resolve(__dirname, `../data/`, filePath);
                                    let reference = bucket.file("data/" + filePath);
                                    let buffer = Buffer.from(typeof data == 'string' ? data : JSON.stringify(data), 'utf-8');
                                    return new Promise((acc) => {
                                        let blobStream = reference.createWriteStream({
                                            resumable: false
                                        });
                                        blobStream.on('finish', () => {
                                                acc("Success");
                                            })
                                            .on('error', (e) => {
                                                acc(`Unable to upload file: ${JSON.stringify(e)}`);
                                            })
                                            .end(buffer);
                                    });
                                    // await uploadFirebaseFile(typeof data == 'string' ? data : JSON.stringify(data), filePath)//await fs.promises.writeFile(absPath, )
                                    // return 'success';
                                });
                            },
                            exists(filePath) {
                                return __awaiter(this, void 0, void 0, function*() {
                                    if (filePath.startsWith('./')) {
                                        filePath = filePath.substring(2);
                                    }
                                    if (filePath.startsWith('/')) {
                                        filePath = filePath.substring(1);
                                    }
                                    let reference = bucket.file("data/" + filePath);
                                    return (yield reference.exists())[0]; //firebaseFileExists(pathName)// return fs.existsSync(absPath)
                                });
                            }
                        });
                        exports.listener = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function*() {
                            res.setHeader('Content-Type', 'application/xml');
                            let exampleParams = WonderData_1.ExampleRequest.replace('</request-parameters>', '').replace('<request-parameters>', '').replaceAll('<value/>', '<value></value>').replaceAll('<parameter>', '').replaceAll('</name>', '').replaceAll('</value>', '').replaceAll('<name>', '').split('</parameter>').map(str => {
                                let tmp = str.split('<value>');
                                let name = tmp[0];
                                let rest = tmp.slice(1);
                                return [name, rest];
                            });
                            let reqTestParams = new WonderData_1.WonderRequest().groupBy('Year').groupBy('Race').addParam('F_D76.V25', WonderData_1.WonderQueryParam_Util.All).toParamMap();
                            let requestParams = new Map();
                            let inconsistencies = [];
                            exampleParams.forEach((value) => {
                                if (!reqTestParams.has(value[0])) {
                                    inconsistencies.push(`Request missing ${value[0]}`);
                                }
                                requestParams.set(value[0], value[1]);
                            });
                            for (let exParamName in reqTestParams.keys()) {
                                if (!requestParams.has(exParamName)) {
                                    inconsistencies.push(`Examples missing ${exParamName}`);
                                }
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(inconsistencies));
                        }));
                        exports.ReqTest = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function*() {
                            // res.setHeader('Content-Type', 'application/xml')
                            // res.send(new WonderRequest().groupBy('Year').addParam('M_1', 'D76.M1').toString())
                            res.send(yield database.fileAccessor.writeFile("test.json", { myBigData: "Stuff and things" }));
                        }));
                        exports.RonaTest = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function*() {
                            let data = yield new WonderData_1.WonderRequest().groupBy('Year').groupBy('AgeGroups').filterByYear(['1999', '2001']).request();
                            let exportPath = path.resolve(__dirname, '../data/exampleResponse.xml');
                            console.log(`saving to file${exportPath}`);
                            fs.writeFileSync(exportPath, JSON.stringify(data));
                            console.log('saved');
                            res.setHeader('Content-Type', 'application/json');
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.send(data);
                        }));

                        function requestToFileName(fetchBody) {
                            console.log(`Req to file name\n${fetchBody}`);
                            return crypto.createHash('md5').update(fetchBody).digest("hex");
                        }
                        exports.WonderProxy = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function*() {
                            let fetchBody = req.body['request_xml'];
                            // console.log(`Fetch body: ${fetchBody}`)
                            let fileName = requestToFileName(fetchBody);
                            let fileDirectory = path.resolve(__dirname, `../data/xml/`);
                            if (!fs.existsSync(fileDirectory)) {
                                fs.mkdirSync(fileDirectory);
                            }
                            let exportPath = path.resolve(fileDirectory, `${fileName}.xml`);
                            if (fs.existsSync(exportPath)) {
                                console.log(`Using cache for request ${fileName}`);
                                res.setHeader('Content-Type', 'application/xml');
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.sendFile(exportPath);
                                return;
                            }
                            // console.log(`Sending query to wonder:\n${fetchBody}`)
                            let result = yield(0, node_fetch_1.default)(`https://wonder.cdc.gov/controller/datarequest/D76`, {
                                method: 'POST',
                                body: `request_xml=${fetchBody}`,
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
                                // mode: 'no-cors'
                            });
                            let resultText = yield result.text();
                            // console.log(`saving to file: ${exportPath}`)
                            fs.writeFileSync(exportPath, resultText);
                            res.setHeader('Content-Type', 'application/xml');
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.send(resultText);
                        }));
                        exports.Data = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function*() {
                            resp.setHeader('Content-Type', 'application/json');
                            resp.setHeader('Access-Control-Allow-Origin', '*');
                            // let name = req.path.startsWith('.')
                            let filePath = req.path.startsWith("/") ? req.path.substring(1) : req.path;
                            console.log(filePath);
                            switch (req.method) {
                                case 'GET':
                                    if (!(yield database.fileAccessor.exists(filePath))) {
                                        resp.send(`No file ${filePath}`);
                                    }
                                    let file = yield database.fileAccessor.readFile(filePath);
                                    resp.send(file);
                                    break;
                                case 'POST':
                                    let data = typeof req.body == 'string' ? req.body : JSON.stringify(req.body);
                                    try {
                                        resp.send(yield database.fileAccessor.writeFile(filePath, data));
                                    } catch (err) {
                                        resp.send(`Failed to save data ${JSON.stringify(err)}`);
                                    }
                                    break;
                                default:
                                    resp.send(`Unknown method ${req.method}`);
                            }
                        }));
                        exports.DataExists = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function*() {
                            resp.setHeader('Content-Type', 'application/json');
                            resp.setHeader('Access-Control-Allow-Origin', '*');
                            // let name = req.path.startsWith('.')
                            let file = path.resolve(__dirname, '../data/', '.' + req.path);
                            console.log(`Checking if ${file} exists`);
                            switch (req.method) {
                                case 'GET':
                                    if (!fs.existsSync(file)) {
                                        resp.send(`false`);
                                        return;
                                    }
                                    resp.send('true');
                                    break;
                                    break;
                                default:
                                    resp.send(`Unknown method ${req.method}`);
                            }
                        }));
                        exports.Diseases = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function*() {
                            let codes = yield database.pullIcdCodes(10);
                            resp.setHeader('Content-Type', 'application/json');
                            resp.setHeader('Access-Control-Allow-Origin', '*');
                            resp.send(JSON.stringify(codes));
                        }));
                        exports.HashTypes = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function*() {
                            (0, child_process_1.exec)('openssl list -digest-algorithms', (err, stdout, stderr) => {
                                if (err) {
                                    console.log('err', err);
                                    res.send(JSON.stringify({ status: 'Error', error: err }));
                                    return;
                                }
                                if (stderr) {
                                    console.log('stderr', stderr);
                                    res.send(JSON.stringify({ status: 'STDError', error: stderr }));
                                    return;
                                }
                                console.log('success', stdout);
                                res.send(JSON.stringify({ status: 'Success', value: stdout }));
                            });
                        }));
                        //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1BGdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmNGdW5jdGlvbnMvV1BGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFnRDtBQUNoRCw0REFBOEI7QUFFOUIsdUNBQXdCO0FBQ3hCLDJDQUE0QjtBQUM1QixnQ0FBNkI7QUFDN0Isb0RBQW9HO0FBQ3BHLGlEQUFvQztBQUNwQywrQ0FBZ0M7QUFDaEMsNkVBQWlFO0FBQ2pFLDRDQUF5RTtBQUN6RSx3RUFBMEQ7QUFDMUQsc0NBQXNDO0FBQ3RDLDJEQUEyRDtBQUMzRCw2REFBbUU7QUFFbkUsSUFBQSxtQkFBYSxFQUFDO0lBQ1osVUFBVSxFQUFFLElBQUEsVUFBSSxFQUFDLGdEQUFrQyxDQUFDO0lBQ3BELGFBQWEsRUFBRSwyQkFBMkI7Q0FDM0MsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxlQUFlLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2xELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVyQyxFQUFFO0FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUVuQixJQUFJLFFBQVEsR0FBRyxJQUFJLDRCQUFRLENBQUM7SUFDcEIsUUFBUSxDQUFJLFFBQVE7O1lBQ3hCLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDakM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2pDO1lBQ0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyw2QkFBNkI7Z0JBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsdUJBQXVCLE9BQU8sRUFBRSxFQUFFLENBQUE7YUFDbkQ7WUFDRCxpREFBaUQ7WUFDakQscUNBQXFDO1lBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBTSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUNLLFNBQVMsQ0FBSSxRQUFnQixFQUFFLElBQWdCOztZQUNuRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2pDO1lBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNqQztZQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDO29CQUMzQyxTQUFTLEVBQUUsS0FBSztpQkFDakIsQ0FBQyxDQUFBO2dCQUNGLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtvQkFDM0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUNoQixDQUFDLENBQUM7cUJBQ0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNqQixHQUFHLENBQUMsMEJBQTBCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNwRCxDQUFDLENBQUM7cUJBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1lBRUYsb0lBQW9JO1lBQ3BJLG9CQUFvQjtRQUN0QixDQUFDO0tBQUE7SUFDSyxNQUFNLENBQUMsUUFBZ0I7O1lBQzNCLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDakM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2pDO1lBQ0QsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQSw4REFBOEQ7UUFDcEcsQ0FBQztLQUFBO0NBQ0YsQ0FBQyxDQUFBO0FBRVcsUUFBQSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxJQUFJLGFBQWEsR0FBeUIsMkJBQWMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdFQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JCLENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxhQUFhLEdBQUcsSUFBSSwwQkFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGtDQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRXJJLElBQUksYUFBYSxHQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3JELElBQUksZUFBZSxHQUFhLEVBQUUsQ0FBQTtJQUNsQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLGVBQWUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDcEQ7UUFDRCxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssSUFBSSxXQUFXLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ25DLGVBQWUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLFdBQVcsRUFBRSxDQUFDLENBQUE7U0FDeEQ7S0FDRjtJQUdELEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7SUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNXLFFBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ2xFLG1EQUFtRDtJQUNuRCxxRkFBcUY7SUFDckYsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqRyxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBQ1csUUFBQSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkUsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLDBCQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBR2xILElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUMxQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2pELEdBQUcsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsU0FBUyxpQkFBaUIsQ0FBQyxTQUFpQjtJQUUxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBQzdDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFDWSxRQUFBLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0RSxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZDLDBDQUEwQztJQUMxQyxJQUFJLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMzQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNqQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzVCO0lBQ0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxRQUFRLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ2xELEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUE7UUFDaEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUVqRCxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3hCLE9BQU87S0FDUjtJQUNELHdEQUF3RDtJQUN4RCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUEsb0JBQUssRUFBQyxtREFBbUQsRUFBRTtRQUM1RSxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxlQUFlLFNBQVMsRUFBRTtRQUNoQyxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsbUNBQW1DLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO1FBQzdGLGtCQUFrQjtLQUNuQixDQUFDLENBQUE7SUFFRixJQUFJLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUdyQywrQ0FBK0M7SUFDL0MsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFFeEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNXLFFBQUEsSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBRWhFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNsRCxzQ0FBc0M7SUFDdEMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLEtBQUssS0FBSztZQUVSLElBQUksQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLFFBQVEsRUFBRSxDQUFDLENBQUE7YUFDakM7WUFDRCxJQUFJLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDZixNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxJQUFJLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUUsSUFBSTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDakU7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUN4RDtZQUNELE1BQU07UUFDUjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO0tBQzVDO0FBRUgsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNXLFFBQUEsVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBRXRFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNsRCxzQ0FBc0M7SUFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksU0FBUyxDQUFDLENBQUE7SUFDekMsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2xCLEtBQUssS0FBSztZQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNsQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pCLE1BQU07WUFFTixNQUFNO1FBQ1I7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtLQUM1QztBQUVILENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDVyxRQUFBLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNwRSxJQUFJLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtJQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRWxELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ2xDLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDVyxRQUFBLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNwRSxJQUFBLG9CQUFJLEVBQUMsaUNBQWlDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzlELElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pELE9BQU87U0FDUjtRQUNELElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9ELE9BQU07U0FDUDtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==

                        /***/
                    }),

                    /***/
                    "./srcFunctions/common/FBF_Helpers.ts":
                    /*!********************************************!*\
                      !*** ./srcFunctions/common/FBF_Helpers.ts ***!
                      \********************************************/
                    /***/
                        (function(__unused_webpack_module, exports, __webpack_require__) {


                        var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
                            function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
                            return new(P || (P = Promise))(function(resolve, reject) {
                                function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

                                function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

                                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                                step((generator = generator.apply(thisArg, _arguments || [])).next());
                            });
                        };
                        Object.defineProperty(exports, "__esModule", ({ value: true }));
                        exports.replaceAllInString = exports.isAllTrue = exports.XmlToJson = exports.concactinate = exports.flatten = exports.ensureFBF_Helpers = exports.promiseDefault = exports.isNode = void 0;
                        const Xml2JS = __webpack_require__( /*! xml2js */ "xml2js").parseString;

                        function isNode() {
                            return typeof window == 'undefined';
                        }
                        exports.isNode = isNode;

                        function promiseDefault(prom, defaultValue) {
                            return __awaiter(this, void 0, void 0, function*() {
                                return new Promise((acc) => {
                                    prom.then(acc).catch(e => acc(defaultValue));
                                });
                            });
                        }
                        exports.promiseDefault = promiseDefault;
                        // export function ObjectMap<A,B>(input: A, transform: <k extends keyof A>()=>B): B {
                        // return null
                        // }
                        Array.prototype.forEachAsync = function(onEach) {
                            return __awaiter(this, void 0, void 0, function*() {
                                for (let i = 0; i < this.length; i++) {
                                    if ((yield onEach(this[i], i, this)) == 'BREAK') {
                                        break;
                                    }
                                }
                            });
                        };
                        Map.prototype.keysAsArray = function() {
                            let ths = this;
                            let out = [];
                            for (let key of ths.keys()) {
                                out.push(key);
                            }
                            return out;
                        };
                        Array.prototype.mapOrDrop = function(shouldKeep) {
                            let ths = this;
                            let out = [];
                            for (let i = 0; i < ths.length; i++) {
                                let fresh = shouldKeep(this[i], i);
                                if (fresh == 'DROP') {
                                    // console.log(`Dropping ${i}`,this[i])
                                } else {
                                    out.push(fresh);
                                }
                            }
                            return out;
                        };
                        Map.prototype.getWithDefault = function(key, defaultValue) {
                            let ths = this;
                            if (!ths.has(key)) {
                                ths.set(key, defaultValue(key));
                            }
                            return ths.get(key);
                        };
                        Array.prototype.pushAll = function(stuff) {
                            if (Array.isArray(stuff)) {
                                for (let item of stuff) {
                                    this.push(item);
                                }
                            } else {
                                this.push(stuff);
                            }
                        };
                        String.prototype.isBoolean = function() {
                            return this.toLowerCase() == 'true' || this.toLowerCase() == 'false';
                        };
                        String.prototype.isNumber = function() {
                            return !Number.isNaN(Number(this));
                        };
                        // if (typeof Map.prototype.toArray == 'undefined') {
                        //     console.log(`Shimming Map.toArray`)
                        //     Map.prototype.toArray = function <K, V>() {
                        //         let ths: Map<K, V> = this
                        //         let out: Array<[K, V]> = []
                        //         for (let key of ths.keys()) {
                        //             out.push([key, ths.get(key)]);
                        //         }
                        //         return out
                        //     }
                        // }
                        function ensureFBF_Helpers() {
                            console.log();
                        }
                        exports.ensureFBF_Helpers = ensureFBF_Helpers;

                        function flatten(arr) {
                            let out = [];
                            for (let i = 0; i < arr.length; i++) {
                                for (let j = 0; j < arr[i].length; j++) {
                                    out.push(arr[i][j]);
                                }
                            }
                            return out;
                        }
                        exports.flatten = flatten;

                        function concactinate(a, b) {
                            let out = [];
                            a.forEach((aa) => {
                                out.push(aa);
                            });
                            b.forEach((bb) => {
                                out.push(bb);
                            });
                            return out;
                        }
                        exports.concactinate = concactinate;

                        function XmlToJson(xml) {
                            return __awaiter(this, void 0, void 0, function*() {
                                return new Promise((acc, rej) => {
                                    Xml2JS(`<data>${xml}</data>`, (err, value) => {
                                        if (err) {
                                            rej(err);
                                        } else {
                                            // console.log('cleaning',value)
                                            // let result = cleanXmlToJson(value) as XmlElement;
                                            acc(value.data);
                                        }
                                    });
                                });
                            });
                        }
                        exports.XmlToJson = XmlToJson;
                        if (typeof String.prototype.replaceAll == 'undefined') {
                            String.prototype.replaceAll = function(a, b) {
                                return this.split(a).join(b);
                            };
                        }

                        function isAllTrue(bools) {
                            for (let i = 0; i < bools.length; i++) {
                                if (bools[i]) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        exports.isAllTrue = isAllTrue;

                        function replaceAllInString(target, a, b) {
                            return target.split(a).join(b);
                        }
                        exports.replaceAllInString = replaceAllInString;
                        //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJGX0hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL0ZCRl9IZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUM7QUF1QjdDLFNBQWdCLE1BQU07SUFDbEIsT0FBTyxPQUFPLE1BQU0sSUFBSSxXQUFXLENBQUE7QUFDdkMsQ0FBQztBQUZELHdCQUVDO0FBQ0QsU0FBc0IsY0FBYyxDQUFJLElBQWdCLEVBQUUsWUFBZTs7UUFDckUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQUE7QUFKRCx3Q0FJQztBQUNELHFGQUFxRjtBQUNyRixjQUFjO0FBQ2QsSUFBSTtBQUNKLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQW1CLE1BQTBFOztRQUN4SCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUEsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSSxPQUFPLEVBQUU7Z0JBQzNDLE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQztDQUFBLENBQUE7QUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFpQixDQUFBO0lBQzNCLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQTtJ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

                        /***/
                    }),

                    /***/
                    "./srcFunctions/common/WonderData.ts":
                    /*!*******************************************!*\
                      !*** ./srcFunctions/common/WonderData.ts ***!
                      \*******************************************/
                    /***/
                        (function(__unused_webpack_module, exports, __webpack_require__) {


                                var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
                                    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
                                    return new(P || (P = Promise))(function(resolve, reject) {
                                        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

                                        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

                                        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                                        step((generator = generator.apply(thisArg, _arguments || [])).next());
                                    });
                                };
                                var __importDefault = (this && this.__importDefault) || function(mod) {
                                    return (mod && mod.__esModule) ? mod : { "default": mod };
                                };
                                Object.defineProperty(exports, "__esModule", ({ value: true }));
                                exports.DataChannelStreaming = exports.DataChannel = exports.Disease = exports.ExampleRequest = exports.ConsumableLinkedList = exports.WonderRequest = exports.DeWonder = exports.AllWonderParams = exports.WonderQueryParam_GroupBy = exports.WonderQueryParam_Race = exports.WonderQueryParam_Gender = exports.WonderQueryParam_Measure = exports.WonderQueryParam_AgeGroup = exports.WonderQueryParam_Include = exports.WonderQueryParam = exports.WonderQueryParam_Util = exports.parseYearMonthString = exports.isYearMonthString = exports.MonthEnum = exports.YearStrings = exports.MonthNames = exports.isWQP_None = void 0;
                                // import * as XMLParser from 'xml2js'
                                if (true) {
                                    global.fetch = __webpack_require__( /*! node-fetch */ "node-fetch");
                                }
                                const bristolboard_1 = __webpack_require__( /*! bristolboard */ "bristolboard");
                                const sorted_btree_1 = __importDefault(__webpack_require__( /*! sorted-btree */ "sorted-btree"));
                                const FBF_Helpers_1 = __webpack_require__( /*! ./FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
                                const WonderDataImports_1 = __webpack_require__( /*! ./WonderData/WonderDataImports */ "./srcFunctions/common/WonderData/WonderDataImports.ts");
                                // export type WonderQueryParamName = (keyof typeof WonderQueryParam) 
                                function isWQP_None(param) {
                                    return (param == 'None') || (param == WonderQueryParam_Util.None);
                                }
                                exports.isWQP_None = isWQP_None;
                                var MonthNames;
                                (function(MonthNames) {
                                    MonthNames[MonthNames["Jan"] = 1] = "Jan";
                                    MonthNames[MonthNames["Feb"] = 2] = "Feb";
                                    MonthNames[MonthNames["Mar"] = 3] = "Mar";
                                    MonthNames[MonthNames["Apr"] = 4] = "Apr";
                                    MonthNames[MonthNames["May"] = 5] = "May";
                                    MonthNames[MonthNames["Jun"] = 6] = "Jun";
                                    MonthNames[MonthNames["Jul"] = 7] = "Jul";
                                    MonthNames[MonthNames["Aug"] = 8] = "Aug";
                                    MonthNames[MonthNames["Sep"] = 9] = "Sep";
                                    MonthNames[MonthNames["Oct"] = 10] = "Oct";
                                    MonthNames[MonthNames["Nov"] = 11] = "Nov";
                                    MonthNames[MonthNames["Dec"] = 12] = "Dec";
                                })(MonthNames = exports.MonthNames || (exports.MonthNames = {}));

                                function YearStrings(start = 1999, end = 2020) {
                                    let out = [];
                                    for (let i = start; i <= end; i++) {
                                        out.push(`${i}`);
                                    }
                                    return out;
                                }
                                exports.YearStrings = YearStrings;
                                var MonthEnum;
                                (function(MonthEnum) {
                                    MonthEnum[MonthEnum["January"] = 0] = "January";
                                    MonthEnum[MonthEnum["February"] = 1] = "February";
                                    MonthEnum[MonthEnum["March"] = 2] = "March";
                                    MonthEnum[MonthEnum["April"] = 3] = "April";
                                    MonthEnum[MonthEnum["May"] = 4] = "May";
                                    MonthEnum[MonthEnum["June"] = 5] = "June";
                                    MonthEnum[MonthEnum["July"] = 6] = "July";
                                    MonthEnum[MonthEnum["August"] = 7] = "August";
                                    MonthEnum[MonthEnum["September"] = 8] = "September";
                                    MonthEnum[MonthEnum["October"] = 9] = "October";
                                    MonthEnum[MonthEnum["November"] = 10] = "November";
                                    MonthEnum[MonthEnum["December"] = 11] = "December";
                                })(MonthEnum = exports.MonthEnum || (exports.MonthEnum = {}));

                                function isYearMonthString(str) {
                                    return str.split('-').length == 2;
                                }
                                exports.isYearMonthString = isYearMonthString;

                                function parseYearMonthString(str) {
                                    let parts = str.split('-');
                                    switch (parts.length) {
                                        case 0:
                                            return null;
                                        case 1:
                                            return [parts[0], -1];
                                        case 2:
                                            return [parts[0], MonthEnum[parts[1]]];
                                    }
                                }
                                exports.parseYearMonthString = parseYearMonthString;
                                var WonderQueryParam_Util;
                                (function(WonderQueryParam_Util) {
                                    WonderQueryParam_Util["None"] = "*None*";
                                    WonderQueryParam_Util["All"] = "*All*";
                                })(WonderQueryParam_Util = exports.WonderQueryParam_Util || (exports.WonderQueryParam_Util = {}));
                                var WonderQueryParam;
                                (function(WonderQueryParam) {
                                    //FIV
                                    WonderQueryParam["YearAndMonth"] = "D76.V1";
                                })(WonderQueryParam = exports.WonderQueryParam || (exports.WonderQueryParam = {}));
                                var WonderQueryParam_Include;
                                (function(WonderQueryParam_Include) {
                                    WonderQueryParam_Include["YearAndMonth"] = "D76.V1";
                                    WonderQueryParam_Include["CensusRegions"] = "D76.V10";
                                    WonderQueryParam_Include["ICD10Codes"] = "D76.V2";
                                    WonderQueryParam_Include["HHSRegions"] = "D76.V27";
                                    WonderQueryParam_Include["StatesAndCounties"] = "D76.V9";
                                })(WonderQueryParam_Include = exports.WonderQueryParam_Include || (exports.WonderQueryParam_Include = {}));
                                var WonderQueryParam_AgeGroup;
                                (function(WonderQueryParam_AgeGroup) {
                                    WonderQueryParam_AgeGroup["TenYear"] = "D76.V5";
                                    WonderQueryParam_AgeGroup["FiveYear"] = "D76.V51";
                                    WonderQueryParam_AgeGroup["SingleYear"] = "D76.V52";
                                    WonderQueryParam_AgeGroup["Infant"] = "D76.V6";
                                })(WonderQueryParam_AgeGroup = exports.WonderQueryParam_AgeGroup || (exports.WonderQueryParam_AgeGroup = {}));
                                var WonderQueryParam_Measure;
                                (function(WonderQueryParam_Measure) {
                                    WonderQueryParam_Measure["Deaths"] = "D76.M1";
                                    WonderQueryParam_Measure["Population"] = "D76.M2";
                                    WonderQueryParam_Measure["CrudeRate"] = "D76.M3";
                                    WonderQueryParam_Measure["CrudeRateStandardError"] = "D76.M31";
                                    WonderQueryParam_Measure["CrudeRate95ConfidenceInterval"] = "D76.M32";
                                    WonderQueryParam_Measure["AgeAdjustedRate"] = "D76.M4";
                                    WonderQueryParam_Measure["AgeAdjustedRateStandardError"] = "D76.M41";
                                    WonderQueryParam_Measure["AgeAdjustedRateConfidenceInterval"] = "D76.M42";
                                    WonderQueryParam_Measure["PercentOfTotalDeaths"] = "D76.M9";
                                })(WonderQueryParam_Measure = exports.WonderQueryParam_Measure || (exports.WonderQueryParam_Measure = {}));
                                var WonderQueryParam_Gender;
                                (function(WonderQueryParam_Gender) {
                                    WonderQueryParam_Gender["Male"] = "M";
                                    WonderQueryParam_Gender["Female"] = "F";
                                })(WonderQueryParam_Gender = exports.WonderQueryParam_Gender || (exports.WonderQueryParam_Gender = {}));
                                var WonderQueryParam_Race;
                                (function(WonderQueryParam_Race) {
                                    WonderQueryParam_Race["HispanicOrLatino"] = "2135-2";
                                    WonderQueryParam_Race["NotHispanicOrLatino"] = "2186-2";
                                    WonderQueryParam_Race["NotStated"] = "NS";
                                    WonderQueryParam_Race["AmericanIndianOrAlaskaNative"] = "1002-5";
                                    WonderQueryParam_Race["AsianOrPacificIslander"] = "A-PI";
                                    WonderQueryParam_Race["Black"] = "2054-5";
                                    WonderQueryParam_Race["White"] = "2106-3";
                                })(WonderQueryParam_Race = exports.WonderQueryParam_Race || (exports.WonderQueryParam_Race = {}));
                                var WonderQueryParam_GroupBy;
                                (function(WonderQueryParam_GroupBy) {
                                    WonderQueryParam_GroupBy["CensusRegion"] = "D76.V10-level1";
                                    WonderQueryParam_GroupBy["CensusDivision"] = "D76.V10-level2";
                                    WonderQueryParam_GroupBy["HHSRegion"] = "D76.V27-level1";
                                    WonderQueryParam_GroupBy["State"] = "D76.V9-level1";
                                    WonderQueryParam_GroupBy["County"] = "D76.V9-level2";
                                    WonderQueryParam_GroupBy["Urbanization2013"] = "D76.V19";
                                    WonderQueryParam_GroupBy["Urbanization2006"] = "D76.V11";
                                    WonderQueryParam_GroupBy["AgeGroups"] = "D76.V5";
                                    WonderQueryParam_GroupBy["Gender"] = "D76.V7";
                                    WonderQueryParam_GroupBy["HispanicOrigin"] = "D76.V17";
                                    WonderQueryParam_GroupBy["Race"] = "D76.V8";
                                    //timeThere 
                                    WonderQueryParam_GroupBy["Year"] = "D76.V1-level1";
                                    WonderQueryParam_GroupBy["Month"] = "D76.V1-level2";
                                    WonderQueryParam_GroupBy["Weekday"] = "D76.V24";
                                    WonderQueryParam_GroupBy["Autopsy"] = "D76.V20";
                                    WonderQueryParam_GroupBy["PlaceofDeath"] = "D76.V21";
                                    WonderQueryParam_GroupBy["ICD10"] = "D76.V2";
                                    WonderQueryParam_GroupBy["LeadingCausesofDeath"] = "D76.V28";
                                    WonderQueryParam_GroupBy["LeadingCausesofDeathInfants"] = "D76.V29";
                                    WonderQueryParam_GroupBy["ICDChapter"] = "D76.V2-level1";
                                    WonderQueryParam_GroupBy["ICDSubChapter"] = "D76.V2-level2";
                                    WonderQueryParam_GroupBy["CauseOfDeath"] = "D76.V2-level3";
                                    WonderQueryParam_GroupBy["ICD10_113CauseList"] = "D76.V4";
                                    WonderQueryParam_GroupBy["ICD10_130CauseListInfants"] = "D76.V12";
                                    WonderQueryParam_GroupBy["InjuryIntent"] = "D76.V22";
                                    WonderQueryParam_GroupBy["InjuryMechanismAndAllOtherLeadingCauses"] = "D76.V23";
                                    WonderQueryParam_GroupBy["DrugAlcoholInducedCauses"] = "D76.V25";
                                })(WonderQueryParam_GroupBy = exports.WonderQueryParam_GroupBy || (exports.WonderQueryParam_GroupBy = {}));
                                exports.AllWonderParams = [WonderQueryParam_Include, WonderQueryParam_AgeGroup, WonderQueryParam_GroupBy, , WonderQueryParam_Measure, , WonderQueryParam_Util];
                                let WonderQueryParam_Reversed_Cache = null;
                                // export function WonderQueryParam_Reversed() {
                                //   if (WonderQueryParam_Reversed_Cache == null) {
                                //     let WonderQueryParam_Reversed_Cache = {} as any
                                //     for (let key in WonderQueryParam) {
                                //       WonderQueryParam_Reversed_Cache[WonderQueryParam[key]] = key;
                                //     }
                                //   }
                                //   return WonderQueryParam_Reversed_Cache;
                                // }
                                function DeWonder(text) {
                                    let tmp = text;
                                    let allTranslations = [];
                                    for (let groupName in exports.AllWonderParams) {
                                        let group = exports.AllWonderParams[groupName];
                                        for (let key in group) {
                                            allTranslations.push([groupName, group[key], key]);
                                        }
                                    }
                                    allTranslations = allTranslations.sort((a, b) => (b[1].length - a[1].length));
                                    for (let item of allTranslations) {
                                        // console.log(`Replacing ${group[key]} with ${key}`)
                                        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `F_${item[1]}`, `F_Only_${item[2]}`);
                                        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `I_${item[1]}`, `I_Only_${item[2]}`);
                                        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `V_${item[1]}`, `V_Only_${item[2]}`);
                                        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, item[1], item[2]);
                                    }
                                    return tmp;
                                }
                                exports.DeWonder = DeWonder;
                                class WonderRequest {
                                    constructor() {
                                        this.params = new Map();
                                        this.groupByCount = 0;
                                        this.groupByCountLimit = 5;
                                        this.defaultParams = {
                                            'dataset_code': ['D76'],
                                            'B_2': [WonderQueryParam_Util.None],
                                            'B_3': [WonderQueryParam_Util.None],
                                            'B_4': [WonderQueryParam_Util.None],
                                            'B_5': [WonderQueryParam_Util.None],
                                            'O_age': [WonderQueryParam_AgeGroup.TenYear],
                                            'O_location': [WonderQueryParam_Include.StatesAndCounties],
                                            'O_aar_pop': ['0000'],
                                            // 'O_aar_enable': ['false'],
                                            'O_urban': [WonderQueryParam_GroupBy.Urbanization2013],
                                            // 'O_aar_CI': ['true'],
                                            'action-Send': ['Send'],
                                            // 'O_aar_SE': ['true'],
                                            'O_aar': ['aar_none'],
                                            'M_1': [WonderQueryParam_Measure.Deaths],
                                            'M_2': [WonderQueryParam_Measure.Population],
                                            'M_3': [WonderQueryParam_Measure.CrudeRate],
                                            'O_V10_fmode': ['freg'],
                                            'O_V1_fmode': ['freg'],
                                            'O_V25_fmode': ['freg'],
                                            'O_V27_fmode': ['freg'],
                                            'O_V2_fmode': ['freg'],
                                            'O_V9_fmode': ['freg'],
                                            'O_oc-sect1-request': ['close'],
                                            'O_precision': ['1'],
                                            'O_rate_per': ['100000'],
                                            'O_show_supressed': ['true'],
                                            'O_show_totals': ['false'],
                                            'O_show_zeros': ['true'],
                                            'O_timeout': ['600'],
                                            'O_title': ['Example1'],
                                            'O_javascript': ['off'],
                                            'O_ucd': [WonderQueryParam_Include.ICD10Codes],
                                            'F_D76.V1': [WonderQueryParam_Util.All],
                                            'F_D76.V10': [WonderQueryParam_Util.All],
                                            'F_D76.V2': [WonderQueryParam_Util.All],
                                            'F_D76.V9': [WonderQueryParam_Util.All],
                                            'V_D76.V7': [WonderQueryParam_Util.All],
                                            'V_D76.V8': [WonderQueryParam_Util.All],
                                            'V_D76.V9': [],
                                            'V_D76.V6': ['00'],
                                            'V_D76.V52': [WonderQueryParam_Util.All],
                                            'V_D76.V5': [WonderQueryParam_Util.All],
                                            'V_D76.V51': [WonderQueryParam_Util.All],
                                            'V_D76.V17': [WonderQueryParam_Util.All],
                                            'V_D76.V19': [WonderQueryParam_Util.All],
                                            'V_D76.V2': [],
                                            'V_D76.V20': [WonderQueryParam_Util.All],
                                            'V_D76.V21': [WonderQueryParam_Util.All],
                                            'V_D76.V22': [WonderQueryParam_Util.All],
                                            'V_D76.V23': [WonderQueryParam_Util.All],
                                            'V_D76.V24': [WonderQueryParam_Util.All],
                                            'V_D76.V25': [],
                                            'F_D76.V27': [WonderQueryParam_Util.All],
                                            'O_show_suppressed': ['true'],
                                            //values for non-standard age-adjusted rates
                                            // 'VM_D76.M6_D76.V1_S': ['2004'],// [WonderQueryParam_Util.All],//years
                                            // 'VM_D76.M6_D76.V17': [WonderQueryParam_Util.All],//Hispanic Origin
                                            // 'VM_D76.M6_D76.V7': [WonderQueryParam_Util.All],//Gender
                                            // 'VM_D76.M6_D76.V8': [WonderQueryParam_Util.All],//Race
                                            'finder-stage-D76.V1': ['codeset'],
                                            'finder-stage-D76.V10': ['codeset'],
                                            'finder-stage-D76.V2': ['codeset'],
                                            'finder-stage-D76.V25': ['codeset'],
                                            'finder-stage-D76.V27': ['codeset'],
                                            'finder-stage-D76.V9': ['codeset'],
                                            'saved_id': [],
                                            'stage': ['request']
                                        };
                                        this.defaultFIVParams = {};
                                    }
                                    addParam(name, value) {
                                        if (typeof value == 'string') {
                                            this.params.set(name, [value]);
                                        } else {
                                            this.params.set(name, value);
                                        }
                                        return this;
                                    }
                                    urbanBy(version) {
                                        let vCode = WonderQueryParam_GroupBy[version];
                                        this.addParam('O_urban', vCode);
                                        return this;
                                    }
                                    enableAgeAdjustedRate(isEnabled, confidenceInterval95 = isEnabled, standardError = isEnabled) {
                                        this.addParam('O_aar_enable', isEnabled ? 'true' : 'false');
                                        this.addParam('O_aar_CI', confidenceInterval95 ? 'true' : 'false');
                                        this.addParam('O_aar_SE', standardError ? 'true' : 'false');
                                        return this;
                                    }
                                    ageAdjustedRate(rateBy) {
                                        this.addParam('O_arr', rateBy);
                                        return this;
                                    }
                                    population(yearOfPopulationCount) {
                                        this.addParam('O_aar_pop', yearOfPopulationCount);
                                        return this;
                                    }
                                    locationBy(locByName) {
                                        let locBy = WonderQueryParam_Include[locByName];
                                        this.params.set('O_Location', [locBy]);
                                        return this;
                                    }
                                    includeDates(dates) {
                                        let paramName = `F_${WonderQueryParam_Include.YearAndMonth}`;
                                        if (dates == 'all') {
                                            this.params.set(paramName, [WonderQueryParam_Util.All]);
                                            return;
                                        }
                                        return this;
                                    }
                                    enableJavascript(enabled) {
                                        this.addParam('O_javascript', enabled ? 'on' : 'off');
                                        return this;
                                    }
                                    measure(measureBy) {
                                        let paramName = `M_${measureBy.replace('D.76.M', '')}`;
                                        this.addParam(paramName, WonderQueryParam_Measure[measureBy]);
                                    }
                                    causeOfDeathBy(deathBy) {
                                        let code = deathBy in WonderQueryParam_Include ? WonderQueryParam_Include[deathBy] : WonderQueryParam_GroupBy[deathBy];
                                        this.addParam('O_ucd', [code]);
                                        return this;
                                    }
                                    ageGroups(groupName) {
                                        this.addParam(`O_age`, [WonderQueryParam_AgeGroup[groupName]]);
                                        return this;
                                    }
                                    filterByYear(years) {
                                        //let val = (typeof years == 'string') ? years : years.map(y => `${y} (${y})`).join(' ')
                                        // return this.addParam('I_D76.V1', val);
                                        return this.addParam(`F_D76.V1`, years);
                                    }
                                    groupBy(groupByName) {
                                        if (this.groupByCount >= this.groupByCountLimit) {
                                            throw new Error(`Cannot group by more than ${this.groupByCountLimit}`);
                                        }
                                        let parameterName = `B_${this.groupByCount + 1}`;
                                        if (isWQP_None(groupByName)) {
                                            this.addParam(parameterName, WonderQueryParam_Util.None);
                                        } else if (WonderQueryParam_GroupBy[groupByName]) {
                                            let param = WonderQueryParam_GroupBy[groupByName];
                                            this.addParam(parameterName, param);
                                        } else {
                                            this.addParam(parameterName, groupByName);
                                        }
                                        this.groupByCount++;
                                        return this;
                                    }
                                    toParamMap() {
                                        this.setDefaults();
                                        return this.params;
                                    }
                                    alternatives(k) {
                                        if (k.length < 3) {
                                            return [k];
                                        }
                                        let start = k.substring(0, 2);
                                        let rest = k.substring(2);
                                        switch (start) {
                                            case 'F_':
                                                return [k, `I_${rest}`, `V_${rest}`];
                                            case 'I_':
                                                return [k, `F_${rest}`, `V_${rest}`];
                                            case 'V_':
                                                return [k, `I_${rest}`, `F_${rest}`];
                                            default:
                                                return [k];
                                        }
                                    }
                                    setDefaults() {
                                        let ths = this;
                                        for (let key in this.defaultParams) {
                                            if (!((0, FBF_Helpers_1.isAllTrue)(ths.alternatives(key).map((altKey) => {
                                                    // console.log(`Checking alternative ${altKey}`)
                                                    if (ths.params.has(altKey)) {
                                                        // console.log(`----Alt Found ${altKey}`)
                                                    }
                                                    return ths.params.has(altKey);
                                                })))) {
                                                // console.log(`Defaulting ${key} (${DeWonder(key)}) to ${this.defaultParams[key]}`)
                                                this.params.set(key, this.defaultParams[key]);
                                            }
                                        }
                                    }
                                    toString() {
                                            // console.log(`Building query string`)
                                            let ths = this;
                                            let toProcess = [];
                                            let processed = new Map();
                                            let name;
                                            let keyList = new ConsumableLinkedList(this.params.keys());
                                            keyList.consume((key) => {
                                                if (key.startsWith('B_')) {
                                                    toProcess.push([key, ths.params.get(key)]);
                                                    return true;
                                                }
                                                return false;
                                            });
                                            // for (let i = 1; i <= 5; i++) {
                                            //   name = `B_${i}`
                                            //   toProcess.push([name, this.params.has(name) ? this.params.get(name) : [WonderQueryParam_Util.None]])
                                            //   processed.set(name, true)
                                            // }
                                            // for (let key of this.params.keys()) {
                                            //   if (key.startsWith('M_')) {
                                            //     toProcess.push([key, this.params.get(key)])
                                            //     processed.set(key, true)
                                            //   }
                                            // }
                                            keyList.consume((key) => {
                                                if (key.startsWith('M_')) {
                                                    toProcess.push([key, ths.params.get(key)]);
                                                    return true;
                                                }
                                                return false;
                                            });
                                            keyList.consume((key) => {
                                                if (key.startsWith('O_')) {
                                                    toProcess.push([key, ths.params.get(key)]);
                                                    return true;
                                                }
                                                return false;
                                            });
                                            keyList.consume((key) => {
                                                if (key.startsWith('F_') || key.startsWith('I_') || key.startsWith('V_')) {
                                                    toProcess.push([key, ths.params.get(key)]);
                                                    return true;
                                                }
                                                return false;
                                            });
                                            keyList.consume((key) => {
                                                // console.log(`Uordered parameter ${key}`)
                                                toProcess.push([key, ths.params.get(key)]);
                                                return true;
                                            });
                                            // for (let key of this.params.keys()) {
                                            //   if (!processed.has(key)) {
                                            //     toProcess.push([key, this.params.get(key)])
                                            //   }
                                            // }
                                            // console.log(`Full Query:\n${toProcess.map((param: [string, string[]]) => `${param[0]}(${DeWonder(param[0])}) = \n${param[1].join('\n--')}\n`)}`)
                                            return toProcess.map((param, index) => {
                                                        // console.log(`Mapping ${param[0]} (${DeWonder(param[0])}) to `, param[1])
                                                        return `<parameter><name>${param[0]}</name>${param[1].length > 0 ? param[1].map(str => `<value>${str}</value>`).join('') : '<value />'}</parameter>`;
        }).join('');
    }
    requestTable(setDefaults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return WonderRequest.toTable(yield this.request(setDefaults));
        });
    }
    request(setDefaults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientSide = typeof window != 'undefined';
            if (!this.params.has('B_1')) {
                throw new Error(`Please group by at least one property`);
            }
            if (setDefaults) {
                this.setDefaults();
            }
            let reqPartOfBody = this.toString();
            // console.log(`Requesting`, reqPartOfBody)
            // console.log(`Query: ${reqPartOfBody}`)
            let fetchBody = `request_xml=<request-parameters><parameter>
        <name>accept_datause_restrictions</name>
        <value>true</value>
        </parameter>${reqPartOfBody}</request-parameters>`;
            let result = yield fetch(clientSide ? `http://${location.hostname}:5001/gdsn3-22/us-central1/WonderProxy` : `https://wonder.cdc.gov/controller/datarequest/D76`, {
                method: 'POST',
                body: fetchBody,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
                // mode: 'no-cors'
            });
            // console.log(result.status + " " + result.statusText)
            let textResult = yield result.text();
            // console.log(textResult);
            // let jsonValue = await XMLParser.parseStringPromise(textResult, {})
            // console.log('JSON__________----')
            // console.log(jsonValue)
            let json = yield (0, FBF_Helpers_1.XmlToJson)(textResult);
            return json.page[0];
        });
    }
    static toTable(data) {
        var _a, _b;
        try {
            console.log(data);
        }
        catch (err) {
            try {
                console.log((_a = data.message) === null || _a === void 0 ? void 0 : _a.join('\n'));
            }
            catch (errr) {
                console.log(`Bad response`, data);
            }
            return null;
        }
        if (!data.response) {
            try {
                console.log((_b = data.message) === null || _b === void 0 ? void 0 : _b.join('\n'));
            }
            catch (errr) {
                console.log(`Bad response`, data);
            }
            return null;
        }
        let byCodes = (0, FBF_Helpers_1.flatten)(data.response[0].request[0].byvariables.map((v) => v.variable.map((vv) => vv.$.code)));
        console.log('By codes', byCodes);
        let measureCodes = data.response[0]['measure-selections'][0].measure.map((m) => m.$.code);
        let columnCodes = (0, FBF_Helpers_1.concactinate)(byCodes, measureCodes);
        console.log('Column Codes', measureCodes.map((c) => DeWonder(c)));
        let repeatedColumns = [];
        let columnsToRepeat = new Map();
        let rows = [];
        let totals = [];
        let maximums = [];
        data.response[0]['data-table'][0].r.forEach((row) => {
            let column = [];
            columnsToRepeat.clear();
            for (let i = 0; i < repeatedColumns.length; i++) {
                // console.log(`Repeating ${repeatedColumns[i][1]}`)
                columnsToRepeat.set(repeatedColumns[i][2], repeatedColumns[i][1]);
                repeatedColumns[i][0]--;
                if (repeatedColumns[i][0] <= 0) {
                    repeatedColumns.splice(i, 1);
                }
            }
            row.c.forEach((col, colIndex) => {
                var _a;
                if (columnsToRepeat.has(colIndex)) {
                    column.push(columnsToRepeat.get(colIndex));
                }
                let val = (typeof col.$.l == 'undefined') ?
                    (col.$.v == "Unreliable" ? "Unreliable" : Number((_a = col.$.v) === null || _a === void 0 ? void 0 : _a.replaceAll(',', '')))
                    : col.$.l;
                if (col.$.r) {
                    // console.log(`Repeating ${val} ${Number(col.$.r) - 1} times`)
                    repeatedColumns.push([Number(col.$.r) - 1, val, colIndex]);
                }
                column.push(val);
            });
            while (totals.length < column.length) {
                totals.push(0);
            }
            while (maximums.length < column.length) {
                maximums.push(-1);
            }
            for (let i = 0; i < column.length; i++) {
                if (typeof column[i] == 'number') {
                    if (maximums[i] == -1 || column[i] > maximums[i] || Number.isNaN(maximums[i])) {
                        maximums[i] = column[i];
                    }
                    totals[i] += column[i];
                }
                else {
                    totals[i] = -1;
                }
            }
            rows.push(column);
        });
        let output = { rowTotals: totals, rowMaximums: maximums, columnCodes: columnCodes, columnNames: columnCodes.map((code) => DeWonder(code)), rows: rows };
        console.log(output);
        return output;
    }
}
exports.WonderRequest = WonderRequest;
class ConsumableLinkedList {
    constructor(values) {
        this.root = null;
        if (!Array.isArray(values)) {
            let vals = [];
            let node = null;
            for (let item of values) {
                if (node == null) {
                    this.root = { value: item, next: null };
                    node = this.root;
                }
                else {
                    node.next = { value: item, next: null };
                    node = node.next;
                }
            }
        }
        else {
            this.root = { value: values[0], next: null };
            let node = this.root;
            for (let i = 1; i < values.length; i++) {
                node.next = { value: values[i], next: null };
                node = node.next;
            }
        }
    }
    consume(onEach) {
        let node = this.root;
        let lastNode = null;
        while (node != null) {
            if (onEach(node.value)) {
                if (lastNode == null) {
                    //  console.log(`Consuming ${node.value} as root now ${this.toString()}`)
                    this.root = node.next;
                    node = this.root;
                }
                else {
                    //  console.log(`Consuming ${node.value} in chain now ${this.toString()}`)
                    lastNode.next = node.next;
                    node = node.next;
                }
            }
            else {
                lastNode = node;
                node = node.next;
            }
        }
        return this;
    }
    toArray() {
        let node = this.root;
        let out = [];
        while (node != null) {
            out.push(node.value);
            node = node.next;
        }
        return out;
    }
    toString() {
        return this.toArray().join(', ');
    }
}
exports.ConsumableLinkedList = ConsumableLinkedList;
exports.ExampleRequest = '<request-parameters><parameter><name>B_1</name><value>D76.V1-level1</value></parameter><parameter><name>B_2</name><value>D76.V8</value></parameter><parameter><name>B_3</name><value>*None*</value></parameter><parameter><name>B_4</name><value>*None*</value></parameter><parameter><name>B_5</name><value>*None*</value></parameter><parameter><name>F_D76.V1</name><value>1999</value><value>2000</value><value>2001</value><value>2002</value><value>2003</value><value>2004</value><value>2005</value><value>2006</value><value>2007</value><value>2008</value><value>2009</value><value>2010</value><value>2011</value><value>2012</value><value>2013</value></parameter><parameter><name>F_D76.V10</name><value>*All*</value></parameter><parameter><name>F_D76.V2</name><value>C00-D48</value></parameter><parameter><name>F_D76.V25</name><value>*All*</value></parameter><parameter><name>F_D76.V27</name><value>*All*</value></parameter><parameter><name>F_D76.V9</name><value>*All*</value></parameter><parameter><name>I_D76.V1</name><value>1999 (1999) 2000 (2000) 2001 (2001) 2002 (2002) 2003 (2003) 2004 (2004) 2005 (2005) 2006 (2006) 2007 (2007) 2008 (2008) 2009 (2009) 2010 (2010) 2011 (2011) 2012 (2012) 2013 (2013) </value></parameter><parameter><name>I_D76.V10</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V2</name><value>C00-D48 (Neoplasms) </value></parameter><parameter><name>I_D76.V25</name><value>All Causes of Death </value></parameter><parameter><name>I_D76.V27</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V9</name><value>*All* (The United States) </value></parameter><parameter><name>M_1</name><value>D76.M1</value></parameter><parameter><name>M_2</name><value>D76.M2</value></parameter><parameter><name>M_3</name><value>D76.M3</value></parameter><parameter><name>M_9</name><value>D76.M9</value></parameter><parameter><name>O_V10_fmode</name><value>freg</value></parameter><parameter><name>O_V1_fmode</name><value>freg</value></parameter><parameter><name>O_V25_fmode</name><value>freg</value></parameter><parameter><name>O_V27_fmode</name><value>freg</value></parameter><parameter><name>O_V2_fmode</name><value>freg</value></parameter><parameter><name>O_V9_fmode</name><value>freg</value></parameter><parameter><name>O_aar</name><value>aar_std</value></parameter><parameter><name>O_aar_CI</name><value>true</value></parameter><parameter><name>O_aar_SE</name><value>true</value></parameter><parameter><name>O_aar_enable</name><value>true</value></parameter><parameter><name>O_aar_pop</name><value>0000</value></parameter><parameter><name>O_age</name><value>D76.V5</value></parameter><parameter><name>O_javascript</name><value>on</value></parameter><parameter><name>O_location</name><value>D76.V9</value></parameter><parameter><name>O_oc-sect1-request</name><value>close</value></parameter><parameter><name>O_precision</name><value>1</value></parameter><parameter><name>O_rate_per</name><value>100000</value></parameter><parameter><name>O_show_suppressed</name><value>true</value></parameter><parameter><name>O_show_totals</name><value>true</value></parameter><parameter><name>O_show_zeros</name><value>true</value></parameter><parameter><name>O_timeout</name><value>600</value></parameter><parameter><name>O_title</name><value>Example1</value></parameter><parameter><name>O_ucd</name><value>D76.V2</value></parameter><parameter><name>O_urban</name><value>D76.V19</value></parameter><parameter><name>VM_D76.M6_D76.V10</name><value/></parameter><parameter><name>VM_D76.M6_D76.V17</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V1_S</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V7</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V1</name><value/></parameter><parameter><name>V_D76.V10</name><value/></parameter><parameter><name>V_D76.V11</name><value>*All*</value></parameter><parameter><name>V_D76.V12</name><value>*All*</value></parameter><parameter><name>V_D76.V17</name><value>*All*</value></parameter><parameter><name>V_D76.V19</name><value>*All*</value></parameter><parameter><name>V_D76.V2</name><value/></parameter><parameter><name>V_D76.V20</name><value>*All*</value></parameter><parameter><name>V_D76.V21</name><value>*All*</value></parameter><parameter><name>V_D76.V22</name><value>*All*</value></parameter><parameter><name>V_D76.V23</name><value>*All*</value></parameter><parameter><name>V_D76.V24</name><value>*All*</value></parameter><parameter><name>V_D76.V25</name><value/></parameter><parameter><name>V_D76.V27</name><value/></parameter><parameter><name>V_D76.V4</name><value>*All*</value></parameter><parameter><name>V_D76.V5</name><value>*All*</value></parameter><parameter><name>V_D76.V51</name><value>*All*</value></parameter><parameter><name>V_D76.V52</name><value>*All*</value></parameter><parameter><name>V_D76.V6</name><value>00</value></parameter><parameter><name>V_D76.V7</name><value>*All*</value></parameter><parameter><name>V_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V9</name><value/></parameter><parameter><name>action-Send</name><value>Send</value></parameter><parameter><name>dataset_code</name><value>D76</value></parameter><parameter><name>dataset_label</name><value>Underlying Cause of Death, 1999-2016</value></parameter><parameter><name>dataset_vintage</name><value>2016</value></parameter><parameter><name>finder-stage-D76.V1</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V10</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V2</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V25</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V27</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V9</name><value>codeset</value></parameter><parameter><name>saved_id</name><value/></parameter><parameter><name>stage</name><value>request</value></parameter></request-parameters>';
function test() {
    let val;
    val;
}
class Disease {
    constructor(description, deathsByAge, population) {
        this.description = description;
        this.deathsByAge = deathsByAge;
        this.population = population;
    }
    getAvailableChannels() {
        let out = [];
        for (let key of Object.keys(this.deathsByAge)) {
            out.push([`DeathsByAge~${key}`, this.deathsByAge[key].title]);
        }
        return out;
    }
    getChannel(id) {
        let parts = id.split('~');
        switch (parts[0]) {
            case 'DeathsByAge':
                return this.deathsByAge[parts[1]];
        }
        return null;
    }
    toJson() {
        return {
            description: this.description,
            deathsByAge: WonderDataImports_1.Database.ageGroupsToJson(this.deathsByAge),
            population: this.population ? this.population.toJson() : null
        };
    }
    static fromJson(json) {
        return new Disease(json.description, WonderDataImports_1.Database.ageGroupsFromJson(json.deathsByAge), json.population ? DataChannel.fromJson(json.population) : null);
    }
}
exports.Disease = Disease;
class DataChannel {
    constructor(title, color = fColor.randomColor()) {
        this.tree = new sorted_btree_1.default();
        this.minValue = null;
        this.maxValue = null;
        this.title = title;
        this.color = color;
    }
    set(time, value) {
        if (this.minValue == null || value < this.minValue) {
            this.minValue = value;
        }
        if (this.maxValue == null || value > this.maxValue) {
            this.maxValue = value;
        }
        this.tree.set(time, value);
    }
    forRange(start, end, onEach) {
        if (!this.tree) {
            return;
        }
        let startNode = this.tree.getPairOrNextLower(start);
        if (!startNode) {
            startNode = this.tree.getPairOrNextHigher(start);
        }
        let endNode = this.tree.getPairOrNextHigher(end);
        if (!endNode) {
            endNode = this.tree.getPairOrNextLower(end);
        }
        this.tree.forRange(startNode[0], endNode[0], true, onEach);
    }
    static fromJson(json) {
        var _a;
        let out = new DataChannel(json.title, bristolboard_1.FColor.fromHex((_a = json === null || json === void 0 ? void 0 : json.color) !== null && _a !== void 0 ? _a : '000000', '', ''));
        out.tree.setPairs(json.data);
        out.minValue = json.valueRange[0];
        out.maxValue = json.valueRange[1];
        return out;
    }
    toJson() {
        var _a;
        let data = this.tree.toArray();
        return {
            title: this.title,
            color: (_a = this.color) === null || _a === void 0 ? void 0 : _a.toHexString(),
            timeDomain: [this.tree.minKey(), this.tree.maxKey()],
            valueRange: [this.minValue, this.maxValue],
            data: data
        };
    }
}
exports.DataChannel = DataChannel;
class DataChannelStreaming extends DataChannel {
    constructor(id, color, source) {
        super(id.split('~')[1], color);
        this.pullingForward = false;
        this.pullingBackward = false;
        this.pullingRoot = false;
        this.hasMoreBackwards = true;
        this.hasMoreForewards = true;
        this.source = source;
        this.id = id;
        this.tree = new sorted_btree_1.default();
    }
    get hasValue() {
        return this.tree && this.tree.size > 0;
    }
    pullBackwards() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingBackward || !this.hasMoreBackwards) {
                return false;
            }
            let ths = this;
            this.pullingBackward = true;
            let time = ths.tree.minKey();
            let backwardsResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'before'
            });
            if (backwardsResp.success) {
                this.tree.setPairs(backwardsResp.data);
                this.hasMoreBackwards = backwardsResp.hasMore;
                this.pullingBackward = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull backward from ${time}`);
        });
    }
    pullForwards() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingForward || !this.hasMoreForewards) {
                return false;
            }
            let ths = this;
            this.pullingForward = true;
            let time = ths.tree.minKey();
            let forewardResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'after'
            });
            if (forewardResp.success) {
                this.tree.setPairs(forewardResp.data);
                this.hasMoreBackwards = forewardResp.hasMore;
                this.pullingForward = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull forward from ${time}`);
        });
    }
    pullRoot(time) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingRoot) {
                return false;
            }
            this.pullingRoot = true;
            let rootResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'before'
            });
            if (rootResp.success) {
                this.tree.setPairs(rootResp.data);
                this.pullingRoot = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull root from ${time}`);
        });
    }
    forRange(start, end, onEach) {
        let found = false;
        let ths = this;
        if (this.hasValue) {
            let lastTime = -1;
            super.forRange(start, end, (time, value, count) => {
                found = true;
                lastTime = time;
                switch (count) {
                    case 0:
                        console.log('found first value');
                        if (time > start) {
                            this.pullBackwards();
                        }
                }
                onEach(time, value, count);
            });
            if (lastTime != -1 && lastTime < end) {
                ths.pullForwards();
            }
        }
        if (!found) {
            this.pullRoot(end);
        }
        // super.forRange()
    }
}
exports.DataChannelStreaming = DataChannelStreaming;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyY0Z1bmN0aW9ucy9jb21tb24vV29uZGVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsSUFBSSxJQUFJLEVBQUU7SUFDUixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQUNyQztBQUNELCtDQUFzQztBQUN0QyxnRUFBaUM7QUFDakMsK0NBQXFIO0FBQ3JILHNFQUEwRDtBQUcxRCxzRUFBc0U7QUFDdEUsU0FBZ0IsVUFBVSxDQUFDLEtBQXFDO0lBQzlELE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQztBQUZELGdDQUVDO0FBR0QsSUFBWSxVQUE0SDtBQUF4SSxXQUFZLFVBQVU7SUFBRyx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSwwQ0FBUSxDQUFBO0lBQUUsMENBQVEsQ0FBQTtJQUFFLDBDQUFRLENBQUE7QUFBQyxDQUFDLEVBQTVILFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBQWtIO0FBRXhJLFNBQWdCLFdBQVcsQ0FBQyxRQUFnQixJQUFJLEVBQUUsTUFBYyxJQUFJO0lBQ2xFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENB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

/***/ }),

/***/ "./srcFunctions/common/WonderData/Database.ts":
/*!****************************************************!*\
  !*** ./srcFunctions/common/WonderData/Database.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFileError = exports.Database = void 0;
const FBF_Helpers_1 = __webpack_require__(/*! ../FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
const WonderDataImports_1 = __webpack_require__(/*! ./WonderDataImports */ "./srcFunctions/common/WonderData/WonderDataImports.ts");
// export function firebaseFile(url?: string) {
//   return FirebaseStorage.ref(firebaseStorage, url)
// }
// export async function firebaseFileExists( filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)
//   return new Promise<boolean>((acc)=>{
//     FirebaseStorage.getDownloadURL(reference).then(s=>acc(true)).catch(e=>acc(false))
//   })
// }
// export async function downloadFirebaseFile( filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)
//   let url = await FirebaseStorage.getDownloadURL(reference)
//   let resp = await fetch(url)
//   let blob = await resp.blob()
//   return blob.text()
// }
// export async function uploadFirebaseFile(content: string, filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)
//   return FirebaseStorage.uploadString(reference, content)
// }
const RawRonaColumnsDefault = [0, 0, 0, '', 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, ''];
class Database {
    constructor(fileAccessor = null) {
        this.deathsByCause = new Map();
        this.populationByAge = new Map();
        this.fileAccessor = null;
        this.arrested = false;
        this.updateListeners = new Map();
        this.updateListenerCount = 0;
        this.diseaseDirectoryPath = './directory.json';
        this.diseaseDirectory = new Map();
        this.deathsByICD = new Map();
        this.fileAccessor = fileAccessor;
        if (fileAccessor) {
            let ths = this;
            fileAccessor.exists(this.diseaseDirectoryPath).then(exists => {
                if (exists) {
                    fileAccessor.readFile(this.diseaseDirectoryPath).then(data => {
                        if (Array.isArray(data)) {
                            for (let description of data) {
                                ths.diseaseDirectory.set(description.icdCode, description);
                                ths.notifyListeners();
                            }
                        }
                        else {
                            console.log(`Failed to read file`, data);
                        }
                    });
                }
            });
        }
        else if (!(0, FBF_Helpers_1.isNode)()) {
        }
    }
    getColorForAgeGroup(ageGroup) {
        switch (ageGroup) {
            case '1-4 years':
                return fColor.blue.darken1;
            case '15-24 years':
                return fColor.blue.darken2;
            case '25-34 years':
                return fColor.blue.darken3;
            default:
                return fColor.blue.base;
        }
    }
    addListener(onUpdate) {
        let index = this.updateListenerCount++;
        this.updateListeners.set(index, onUpdate);
        return index;
    }
    removeListener(index) {
        this.updateListeners.delete(index);
    }
    notifyListeners() {
        for (let listener of this.updateListeners.values()) {
            listener();
        }
    }
    getPopulationForAge(ageGroup) {
        let ths = this;
        return this.populationByAge.getWithDefault(ageGroup, (ag) => new WonderDataImports_1.DataChannel(`AgeGroup${ag}`, ths.getColorForAgeGroup(ag)));
    }
    getDeathsForCause(causeName) {
        if (!this.deathsByCause.has(causeName)) {
            this.deathsByCause.set(causeName, new WonderDataImports_1.DataChannel(`DeathsForCause${causeName}`));
        }
        return this.deathsByCause.get(causeName);
    }
    getDeathsForICD(icdCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.deathsByICD.has(icdCode)) {
                return this.deathsByICD.get(icdCode);
            }
            if (this.diseaseDirectory.has(icdCode)) {
                if (this.fileAccessor) {
                    let filePath = this.diseasePath(icdCode);
                    if (yield this.fileAccessor.exists(filePath)) {
                        let fileResult = yield this.fileAccessor.readFile(filePath);
                        console.log(`Got disease from file`, filePath);
                        if (fileResult != null && !isFileError(fileResult)) {
                            this.deathsByICD.set(icdCode, WonderDataImports_1.Disease.fromJson(fileResult));
                            return WonderDataImports_1.Disease.fromJson(fileResult);
                        }
                        else {
                            console.log(`Couldn't read ICD file ${filePath}`, fileResult);
                        }
                    }
                }
                let result = yield this.pullIcdCode(this.diseaseDirectory.get(icdCode));
                let disease = new WonderDataImports_1.Disease(this.diseaseDirectory.get(icdCode), result);
                return disease;
            }
        });
    }
    findIcdCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            let csvResp = yield fetch('https://raw.githubusercontent.com/k4m1113/ICD-10-CSV/master/codes.csv');
            let csv = yield csvResp.text();
            let lines = csv.split('\n').map(line => {
                line = line.replaceAll(`"`, '');
                let parts = line.split(',');
                // 0: "A00"section
                // 1: "0"item
                // 2: "A000"junk
                // 3: "\"Cholera due to Vibrio cholerae 01"technicalLabel
                // 4: " biovar cholerae\""junk
                // 5: "\"Cholera due to Vibrio cholerae 01"junk
                // 6: " biovar cholerae\""
                // 7: "\"Cholera\""
                return [parts[1] && parts[1].isNumber() ? `${parts[0]}.${parts[1]}` : parts[0], parts[3], parts[parts.length - 1]];
            });
            console.log(lines);
            return lines;
        });
    }
    pullIcdCode(description) {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            try {
                let data = yield new WonderDataImports_1.WonderRequest().groupBy('AgeGroups').groupBy('Month').addParam('F_D76.V2', description.icdCode).requestTable(true);
                if (data != null) {
                    let deathsByAge = {};
                    let current = Date.now();
                    let last = Date.now();
                    let count = 0;
                    description.maxPerMonth = Math.max(description.maxPerMonth, data.rowMaximums[2]);
                    for (let row of data.rows) {
                        if (typeof deathsByAge[row[0]] == 'undefined') {
                            deathsByAge[row[0]] = new WonderDataImports_1.DataChannel(description.laymanName + ' ' + row[0], null);
                        }
                        let time = new Date(row[1].isNumber() ? (row[1].includes('/') ? `${row[1].split('/')[0]} ${row[1].split('/')[1]} 1` : `${row[1]} 1 1`) : row[1]).getTime();
                        deathsByAge[row[0]].set(time, row[2]);
                        current = Date.now();
                        if (current - last > 500) {
                            yield new Promise((acc) => { console.log('pop'); acc(); });
                            console.log(`Popping event loop ${count}`);
                            last = current;
                        }
                        if (ths.arrested) {
                            break;
                        }
                        // console.log(`Processing icd ${row[0]} ${count}/${data.rows.length}`)
                        count++;
                    }
                    let disease = new WonderDataImports_1.Disease(description, deathsByAge);
                    this.deathsByICD.set(description.icdCode, disease);
                    ths.diseaseDirectory.set(description.icdCode, description);
                    console.log(`Got data for icd ${description.icdCode}`, deathsByAge);
                    return deathsByAge;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.log(`Failed to pull ${description.icdCode}`, err);
            }
        });
    }
    pullIcdCodes(max = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            let codes = yield this.findIcdCodes();
            let ths = this;
            let addedIcds = [];
            yield codes.forEachAsync((code, index) => __awaiter(this, void 0, void 0, function* () {
                if (ths.diseaseDirectory.has(code[0])) {
                    if (max != -1) {
                        max++;
                    }
                }
                else {
                    if (max != -1 && index >= max) {
                        return 'BREAK';
                    }
                    console.log(`${max != -1 ? (max - index) + ' ' : ''}Pulling? data for ICD code ${code[0]}`, code);
                    let description = { laymanName: code[2], technicalName: code[1], icdCode: code[0], maxPerMonth: -1 };
                    let codeResult = yield ths.pullIcdCode(description);
                    if (codeResult == null) {
                        if (max != -1) {
                            max++;
                        }
                    }
                    else {
                        // ths.diseaseDirectory.set(code[0], description)
                        addedIcds.push(code[0]);
                    }
                }
            }));
            let output = this.diseaseDirectory.toArrayWithKeys().sort((a, b) => b[1].maxPerMonth - a[1].maxPerMonth).map(s => s[1]); //[s[1],ths.deathsByICD.get(s[0])])
            console.log(output, output.map(s => [s.icdCode, ths.deathsByICD.get(s.icdCode)]));
            if (this.fileAccessor) {
                this.fileAccessor.writeFile(this.diseaseDirectoryPath, output);
                for (let icd of addedIcds) {
                    let disease = ths.deathsByICD.get(icd);
                    let json = disease.toJson();
                    if (json != null) {
                        this.fileAccessor.writeFile(this.diseasePath(icd), json);
                    }
                }
            }
            return output;
        });
    }
    diseasePath(icdCode) {
        return `./byICD/${icdCode.replaceAll('.', '_')}.json`;
    }
    // diseaseToJson(icdCode: string) {
    //   if (!this.deathsByICD.has(icdCode)) {
    //     console.log(`Cannot jsonify non-existant code ${icdCode}`)
    //     return null;
    //   }
    //   let out: DiseaseData_JSON = {
    //     description: this.diseaseDirectory.get(icdCode),
    //     deathsByAge: Database.ageGroupsToJson(this.deathsByICD.get(icdCode))
    //   }
    //   return out;
    // }
    // static fromJson(json: DataChannel_JSON): DataChannel {
    //     let out = new DataChannel(json.title);
    //     out.tree.setPairs(json.data)
    //     return out;
    // }
    static ageGroupsToJson(ageGroupChannels) {
        let out = {};
        for (let key of Object.keys(ageGroupChannels)) {
            out[key] = ageGroupChannels[key].toJson();
        }
        return out;
    }
    static ageGroupsFromJson(ageGroupChannels) {
        let out = {};
        for (let key of Object.keys(ageGroupChannels)) {
            out[key] = WonderDataImports_1.DataChannel.fromJson(ageGroupChannels[key]);
        }
        return out;
    }
    pullCdcData() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield fetch('https://data.cdc.gov/api/views/9bhg-hcku/rows.csv');
            let text = yield result.text();
            let lines = text.split('\n');
            let columnNames = lines[0];
            lines.splice(0, 1);
            let values = lines.mapOrDrop((line, index) => {
                let raw = line.split(',');
                if (raw[3] != 'By Month' || raw[7] != 'All Sexes') {
                    return 'DROP';
                }
                let out = [];
                for (let i = 0; i < raw.length; i++) {
                    switch (i) {
                        case 0:
                        case 1:
                        case 2:
                            out.push(new Date(raw[i]).getTime());
                            break;
                        case 4:
                        case 5:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 14:
                            out.push(Number(raw[i]));
                            break;
                        case 8:
                            out.push(raw[i].replace('Under 1 year', '< 1 year').replace('85 years and over', '85+ years'));
                            break;
                        default:
                            out.push(raw[i]);
                            break;
                    }
                }
                while (out.length < RawRonaColumnsDefault.length) {
                    out.push(RawRonaColumnsDefault[out.length - 1]);
                }
                return out;
                // return [raw[0], raw[1], raw[2], raw[3], raw[4], raw[5], raw[6], raw[7], raw[8], raw[9], raw[10], raw[11], raw[6], raw[6], raw[6], raw[6]] as RawColumns
            });
            let output = { columns: columnNames, rows: values };
            console.log(output);
            window['lastCdc'] = output;
        });
    }
    pullPopulation() {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            let population = yield new WonderDataImports_1.WonderRequest().groupBy('Year').groupBy('AgeGroups').requestTable(true);
            population.rows.forEach((row) => {
                let time = new Date(row[0].isNumber() ? `${row[0]} 1 1` : row[0]).getTime();
                let tree = ths.getPopulationForAge(row[1]);
                tree.set(time, row[3]);
            });
            return this.populationByAge;
        });
    }
    pullDeathsByCause() {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            for (let year = 1999; year <= 2020; year++) {
                for (let month = 1; month <= 12; month++) {
                    let yearMonth = `${year}/${month <= 9 ? '0' + month : month}`;
                    console.log(`Pulling deaths in ${yearMonth}`);
                    let deaths = yield new WonderDataImports_1.WonderRequest().groupBy('CauseOfDeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true);
                    let count = 0;
                    deaths.rows.forEach((row, index) => {
                        let time = new Date(row[2].isNumber() ? (row[2].includes('/') ? `${row[2].split('/')[0]} ${row[2].split('/')[1]} 1` : `${row[2]} 1 1`) : row[2]).getTime();
                        let tree = ths.getDeathsForCause(row[0]);
                        tree.set(time, row[3]);
                        count++;
                        if (count > 1000) {
                            count = 0;
                            // console.log(`Added ${index} rows`)
                        }
                    });
                    ths.notifyListeners();
                }
            }
            return this.deathsByCause;
        });
    }
    buildDataChannel(id, color, side) {
        return __awaiter(this, void 0, void 0, function* () {
            if (side == 'Server') {
                let out = new WonderDataImports_1.DataChannelStreaming(id, color, (request) => __awaiter(this, void 0, void 0, function* () {
                    let resp = yield fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`);
                    return null;
                }));
            }
            else {
                let out = new WonderDataImports_1.DataChannelStreaming(id, color, (request) => __awaiter(this, void 0, void 0, function* () {
                    let resp = yield fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`);
                    return null;
                }));
            }
        });
    }
}
exports.Database = Database;
function isFileError(obj) {
    return typeof obj['error'] == 'string';
}
exports.isFileError = isFileError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL1dvbmRlckRhdGEvRGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXdDO0FBQ3hDLDJEQUFnUjtBQUdoUiwrQ0FBK0M7QUFDL0MscURBQXFEO0FBQ3JELElBQUk7QUFFSixtR0FBbUc7QUFDbkcsNEhBQTRIO0FBRTVILHlDQUF5QztBQUN6Qyx3RkFBd0Y7QUFDeEYsT0FBTztBQUNQLElBQUk7QUFDSixxR0FBcUc7QUFDckcsNEhBQTRIO0FBQzVILDhEQUE4RDtBQUM5RCxnQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBQ2pDLHVCQUF1QjtBQUN2QixJQUFJO0FBQ0osbUhBQW1IO0FBQ25ILDRIQUE0SDtBQUU1SCw0REFBNEQ7QUFDNUQsSUFBSTtBQUVKLE1BQU0scUJBQXFCLEdBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFLbkcsTUFBYSxRQUFRO0lBS25CLFlBQVksZUFBNkIsSUFBSTtRQUo3QyxrQkFBYSxHQUE2QixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ25ELG9CQUFlLEdBQStCLElBQUksR0FBRyxFQUFFLENBQUE7UUFDdkQsaUJBQVksR0FBaUIsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUF1Q2pCLG9CQUFlLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUE7UUFDcEQsd0JBQW1CLEdBQUcsQ0FBQyxDQUFBO1FBOEovQix5QkFBb0IsR0FBVyxrQkFBa0IsQ0FBQTtRQUNqRCxxQkFBZ0IsR0FBb0Ms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

/***/ }),

/***/ "./srcFunctions/common/WonderData/WonderDataImports.ts":
/*!*************************************************************!*\
  !*** ./srcFunctions/common/WonderData/WonderDataImports.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Database */ "./srcFunctions/common/WonderData/Database.ts"), exports);
__exportStar(__webpack_require__(/*! ../WonderData */ "./srcFunctions/common/WonderData.ts"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YUltcG9ydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL1dvbmRlckRhdGEvV29uZGVyRGF0YUltcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTBCO0FBQzFCLGdEQUE2QiJ9

/***/ }),

/***/ "./srcFunctions/firebaseAdminCreds.ts":
/*!********************************************!*\
  !*** ./srcFunctions/firebaseAdminCreds.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseServiceAccountCreds = void 0;
exports.FirebaseServiceAccountCreds = {
    "type": "service_account",
    "project_id": "gdsn3-22",
    "private_key_id": "2ea223b637cc0d3e99e46aac2477e46e55214ad1",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCK6d1wHgIY3ifE\nN0VfHcjdi48MaAAQjrG+y+32JZ6k+XBJyeiWZx7htQ5edhysa8E3dIC/aMciUdmO\ndhCtmCV3+cja66iMwLrJKP6/AECx6UlUPIYG829VLb0hMJnNIvy3+Muw8/InCAGK\n7NqH23bLPmDHah6RtLUS1+g8s6AeVHVrsj0s+euRj3uqDg6Ep0873bKwPPwOLSUn\nZzUU6xOrx0A4wdggRtDLeuMoIi2p5PiMpwj+hmoWUxRL9RkKs/H9zzRi/Kv01jGm\nrBR/9zqL/qHou+1gzdGL1Ek8mq0YAhcrmLKt2C8vxKj/M4xMxdUWZjgpOiqO7mYB\nvWFKM0QXAgMBAAECggEADB3+QjYROhjBdezZpkReLcUWA0pccb/2DTiTV0dMzAMz\nd5xJ0jod3X5XnzHE/91JC2H5i7jDYLZXDdrf9Y8x+tcqXWj1A4zEPkvPJ4YJc/tv\neWOWJVZoExFcUArXP6eaTR9B//t810lsKQbOwSRe+7eYkDcs13TgiUuVZxtxZMkZ\nqh0dHWDv8iQMD3G8eMboW7yo8+HmsBB25iEIRDdHwsXcfA1BBNQOstRr3/Vfv2J9\nOeGI3Lxu3InBZ5t+lYPtiUQMTWJvObmcoAsL4qMtzP2iO09LShGoM1Ux2RnyYXmp\n3OB6wApv/gIOUk28g2jTqUEs1QH7Wl2lnnTFzndnsQKBgQDAwB9IwgGynZ+Bcks+\nnXFnxxI8f6OM3YwcJEbwPlRzJ+YeGBD5rwRTr9fidGXA9Z9vJ5mDsGZAqWxS+4ot\nfzLTn+WAfFDKs9YRno5GZiLIgXk9oXC/NkaCWpb6sCYN0CoyUEbAAGPUZDGYRY+o\nk36wIYDlLoe0p9Fvt2Nh0eDtIwKBgQC4fzSmYv8Hld33X+TozveEhTLn0hKOqGmN\ngjBQETZoaqtmK1xNvDw17PRLSnGnJ5aA/TcxnJWREM2meU66qH/v49uKlA/GUXjt\n86awnnv3wCZPm2Jo8qEAc8gixOOktctihNEsbBSNDL59DM+9GcvbsNIQdLRqLzI4\nDf+ls9s+fQKBgBGNbUvi3uS1FeFj1xZMoBcjObXoqawaQLgPVaZrBqW17G6xIlqa\nZXp5eN9WWi3IMEye/ovPdIBO7V5hKaQbATXkSbH5oCHVXpkcJzih9Gjt4WyLVwkS\nmDkmprkNcWmwmycZyFeTsYOV3C5Rp1NimxbO9j3ojtMUtS3HNXWi9yihAoGATaIx\nTGZRvCZi7Wnrj88vNhM6dXPfHSpeqA4FOFvV0iA4mVhbkdZIW8Smk1vy8Qxmd0aV\nyAmEojM45fkbmM24cAAobGqbLK8xvKcPGDjIH1s6g7r1sQWPm/ocWA0TYUaiG4WZ\n4yBjkWqwaTxP2dmV/46rBgOluxy6+/1f+qDw+50CgYEAr3r+76Dqc9ng/EzNra+/\nG79TU1bpLjb2qYT+p01XcAVCw2MocW3m8NaVtdmmkk751Yuy0JU+VsD1olYdTybY\n0BK/rbEIZlv8ZBA+Iwn+ZHcN5H+MHojfz/Zs+Lo/1fP4ZV6d4i3EEGho89+odSFq\nTozoL+2+GobFMqBrzG1Ogvk=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-816hb@gdsn3-22.iam.gserviceaccount.com",
    "client_id": "109919458213611540968",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-816hb%40gdsn3-22.iam.gserviceaccount.com"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2VBZG1pbkNyZWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjRnVuY3Rpb25zL2ZpcmViYXNlQWRtaW5DcmVkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLDJCQUEyQixHQUFHO0lBQ3pDLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsWUFBWSxFQUFFLFVBQVU7SUFDeEIsZ0JBQWdCLEVBQUUsMENBQTBDO0lBQzVELGFBQWEsRUFBRSxzc0RBQXNzRDtJQUNydEQsY0FBYyxFQUFFLDBEQUEwRDtJQUMxRSxXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFVBQVUsRUFBRSwyQ0FBMkM7SUFDdkQsV0FBVyxFQUFFLHFDQUFxQztJQUNsRCw2QkFBNkIsRUFBRSw0Q0FBNEM7SUFDM0Usc0JBQXNCLEVBQUUsOEdBQThHO0NBQ3ZJLENBQUEifQ==

/***/ }),

/***/ "bristolboard":
/*!*******************************!*\
  !*** external "bristolboard" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("bristolboard");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "firebase-admin/app":
/*!*************************************!*\
  !*** external "firebase-admin/app" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-admin/app");

/***/ }),

/***/ "firebase-admin/storage":
/*!*****************************************!*\
  !*** external "firebase-admin/storage" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("firebase-admin/storage");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-functions");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "sorted-btree":
/*!*******************************!*\
  !*** external "sorted-btree" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("sorted-btree");

/***/ }),

/***/ "xml2js":
/*!*************************!*\
  !*** external "xml2js" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("xml2js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./srcFunctions/WPFunctions.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map