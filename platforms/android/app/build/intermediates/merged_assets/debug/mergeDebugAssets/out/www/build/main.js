webpackJsonp([21],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__principal_principal__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__registro_cliente_registro_cliente__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__qr_ingreso_local_qr_ingreso_local__ = __webpack_require__(190);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, authInstance, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.animation = "";
        this.estadoBoton = false;
        this.textoDelBoton = "Ingresar";
        this.tipo = "dueño";
        this.agrandar = "";
        this.botonUsuarios = "";
        localStorage.setItem("anonimo", "false");
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.Loguear = function () {
        var datos = {
            tipo: this.tipo,
            nombre: "fer",
            img: "fasdfdsaf"
        };
        console.log("hola mundo");
        localStorage.setItem("usuario", JSON.stringify(datos));
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
    };
    LoginPage.prototype.Redireccionar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__registro_cliente_registro_cliente__["a" /* RegistroClientePage */]);
    };
    LoginPage.prototype.DesplegarUsuarios = function () {
        this.botonUsuarios = "ocultar";
        this.agrandar = "agrandar";
    };
    LoginPage.prototype.NoDesplegarUsuarios = function () {
        var _this = this;
        setTimeout(function () {
            _this.botonUsuarios = "";
        }, 500);
        this.agrandar = "";
    };
    LoginPage.prototype.Login = function () {
        var _this = this;
        this.estadoBoton = true;
        this.textoDelBoton = "Espera...";
        if (!this.correo) {
            this.presentToast("Introduzca su correo por favor.");
            setTimeout(function () { return _this.estadoBoton = false; }, 3000);
            this.textoDelBoton = "Ingresar";
            return;
        }
        else {
            if (!this.clave) {
                this.presentToast("No olvide escribir su contraseña.");
                setTimeout(function () { return _this.estadoBoton = false; }, 3000);
                this.textoDelBoton = "Ingresar";
                return;
            }
        }
        this.animation = "ani";
        this.authInstance.auth.signInWithEmailAndPassword(this.correo.toLowerCase(), this.clave)
            .then(function (auth) {
            var usuariosRef = _this.firebase.database().ref("usuarios");
            usuariosRef.once("value", function (snap) {
                var data = snap.val();
                var tipo;
                var estado;
                for (var item in data) {
                    // if (data[item].correo == this.correo.toLowerCase()) {
                    //   localStorage.setItem("usuario", JSON.stringify(data[item]));
                    //   tipo = data[item].tipo;
                    //   break;
                    // }
                    if (data[item].correo == _this.correo.toLowerCase()) {
                        if (!data[item].logueado) {
                            tipo = data[item].tipo;
                            estado = data[item].estado;
                            if (tipo == "cliente" && !_this.authInstance.auth.currentUser.emailVerified) {
                                _this.presentToast("No se ha verificado el correo electrónico todavía.");
                                _this.animation = "";
                                _this.estadoBoton = false;
                                _this.textoDelBoton = "Ingresar";
                                return;
                            }
                            localStorage.setItem("usuario", JSON.stringify(data[item]));
                            usuariosRef.child(item).update({
                                logueado: true
                            }).then(function () {
                                switch (tipo) {
                                    // redirecciono a encuesta
                                    // case "mozo":
                                    // case "cocinero":
                                    // case "bartender":
                                    // case "metre":
                                    // case "repartidor":
                                    //   this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                                    //   break;
                                    case "cliente":
                                        if (estado == "espera")
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */]);
                                        else
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
                                        break;
                                    // redirecciono a qr si no esta dentro del local, pero a principal si, si lo esta.
                                    case "anonimo":
                                        if (estado == "atendido" || estado == "pidio" || estado == "comiendo")
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
                                        else
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */]);
                                        break;
                                    // siempre a principal (dueño, supervisor, cliente (registrado))
                                    default:
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__principal_principal__["a" /* PrincipalPage */]);
                                        break;
                                }
                            });
                            break;
                        }
                        else {
                            _this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
                        }
                    }
                }
                //   if (data[item].correo == this.correo.toLowerCase()) {
                //     if (!data[item].logueado) {
                //       localStorage.setItem("usuario", JSON.stringify(data[item]));
                //       usuariosRef.child(item).update({
                //         logueado: true
                //       }).then(() => { this.navCtrl.setRoot(PrincipalPage); } /**/);
                //       break;
                //     } else {
                //       this.presentToast("Este usuario ya tiene una sesión activa actualmente.");
                //     }
                //   }
                // }
                _this.animation = "";
                _this.estadoBoton = false;
                _this.textoDelBoton = "Ingresar";
                // switch (tipo) {
                //   case "mozo":
                //   case "cocinero":
                //   case "bartender":
                //   case "metre":
                //   case "repartidor":
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                //   case "cliente":
                //   case "anonimo":
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                //   default:
                //     this.navCtrl.setRoot(PrincipalPage);
                //     break;
                // }
            });
        })
            .catch(function (err) {
            _this.animation = "";
            switch (err.code) {
                case "auth/invalid-email":
                    _this.presentToast("El correo ingresado no es valido.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    _this.presentToast("Correo o contraseña incorrectos.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
                    break;
                default:
                    _this.presentToast("Ups... Tenemos problemas tecnicos.");
                    _this.estadoBoton = false;
                    _this.textoDelBoton = "Ingresar";
            }
        });
    };
    LoginPage.prototype.IngresarComoAnonimo = function () {
        var _this = this;
        this.estadoBoton = true;
        this.textoDelBoton = "Espera...";
        this.animation = "ani";
        this.NoDesplegarUsuarios();
        this.authInstance.auth.signInWithEmailAndPassword("anonimo@gmail.com", "123456").then(function () {
            localStorage.setItem("anonimo", "true");
            _this.estadoBoton = false;
            _this.textoDelBoton = "Ingresar";
            _this.animation = "";
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */]);
        }).catch(function () {
            _this.estadoBoton = false;
            _this.textoDelBoton = "Ingresar";
            _this.animation = "";
            _this.presentToast("Ups... Tenemos problemas tecnicos.");
        });
    };
    LoginPage.prototype.SetearUsuario = function (email, password) {
        this.correo = email;
        this.clave = password;
        this.NoDesplegarUsuarios();
    };
    LoginPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\login\login.html"*/'<!--<img class="background" src="../../assets/imgs/alfa/background.jpg" />-->\n\n\n\n<div class="usuarios">\n\n      \n\n    <button [class]="botonUsuarios" (click)="DesplegarUsuarios()">\n\n      <ion-icon name="arrow-down"></ion-icon>\n\n    </button>  \n\n    <div [class]="agrandar">\n\n      <button (click)="SetearUsuario(\'tec.jmfigueiras@gmail.com\', \'123456\')">Dueño</button>\n\n      <button (click)="SetearUsuario(\'fhenseler3@gmail.com\', \'123456\')">Supervisor</button>\n\n      <button (click)="SetearUsuario(\'mozo@gmail.com\', \'123456\')">Mozo</button>\n\n      <button (click)="SetearUsuario(\'cocinero@gmail.com\', \'123456\')">Cocinero</button>\n\n      <button (click)="SetearUsuario(\'bartender@gmail.com\', \'123456\')">Bartender</button>\n\n      <button (click)="SetearUsuario(\'metre@gmail.com\', \'123456\')">Metre</button>\n\n      <button (click)="SetearUsuario(\'repartidor@gmail.com\', \'123456\')">Repartidor</button>\n\n      <button (click)="SetearUsuario(\'cjaviermollar@gmail.com\', \'123456\')">Cliente</button>\n\n      <button (click)="IngresarComoAnonimo()">Anonimo</button>\n\n    </div> \n\n\n\n  </div>\n\n\n\n<div class="vertical-container" (click)="NoDesplegarUsuarios()">\n\n\n\n  <div class="horizontal-container">\n\n    <div class="header">\n\n      <h1>Inicio</h1>\n\n      <img src="../../assets/imgs/alfa/logo.png" [class]="animation" />\n\n    </div>\n\n\n\n    <input type="text" placeholder="Correo electrónico" [(ngModel)]="correo" />\n\n    <input type="password" placeholder="Contraseña" [(ngModel)]="clave" />\n\n\n\n    <span>\n\n      ¿No tienes una cuenta?\n\n      <a (click)="Redireccionar()">Registrate</a>\n\n    </span>\n\n\n\n    <button ion-button outline color="light" (click)="Login()" \n\n      [disabled]="estadoBoton">{{textoDelBoton}}</button>\n\n   \n\n\n\n  </div>\n\n</div>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroClientePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the RegistroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for m
 * import { BarcodeScanner } from '@ionic-native/barcode-scanner';ore info on
 * Ionic pages and navigation.
 */
//Descomentar linea 189 y 118 antes de hacer el push.
var RegistroClientePage = /** @class */ (function () {
    function RegistroClientePage(navCtrl, navParams, authInstance, camera, barcodeScanner, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.prueba = "";
        this.mostrarSpinner = false;
        this.foto = "";
        this.miScan = {};
        this.mostrarAlert = false;
        this.prueba = "";
        // this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        this.formReg = true;
        this.ocultarCabecera = false;
        this.formInicial = false;
        this.formAnon = false;
        this.ocultarContenido = false;
        this.ocultarCabecera = false;
        this.foto = "../../assets/imgs/alfa/perfil.jpg";
        console.log(this.foto);
    }
    RegistroClientePage.prototype.ionViewDidEnter = function () {
        this.foto = "";
        // fires on navCtrl.push(DBLocomotive)
    };
    RegistroClientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegistroClientePage');
    };
    RegistroClientePage.prototype.Registrar = function () {
        //Valido los campos que no esten vacios
        var _this = this;
        if (!this.correo || !this.pass || !this.nombre || !this.apellido || !this.dni) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        if ((this.dni < 1000000) || (this.dni > 99999999)) {
            this.presentToast("El dni es inválido.");
            return;
        }
        this.mostrarSpinner = true;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].dni == _this.dni) {
                    _this.mostrarSpinner = false;
                    _this.presentToast("El DNI ingresado es de  otro usuario registrado.");
                    esValido = false;
                    break;
                }
            }
            if (esValido) {
                var correo_1 = _this.correo.toLowerCase();
                _this.authInstance.auth.createUserWithEmailAndPassword(correo_1, _this.pass)
                    .then(function () {
                    _this.authInstance.auth.currentUser.sendEmailVerification();
                    usuariosRef.push({
                        nombre: _this.nombre,
                        apellido: _this.apellido,
                        correo: correo_1,
                        dni: _this.dni,
                        tipo: "cliente",
                        clave: _this.pass,
                        img: _this.foto,
                        "encuesta": {
                            "pregunta1": {
                                "pesimo": 0,
                                "malo": 0,
                                "mediocre": 0,
                                "bueno": 0,
                                "excelente": 0
                            },
                            "pregunta2": {
                                "si": 0,
                                "no": 0
                            },
                            "pregunta3": {
                                "item1": 0,
                                "item2": 0,
                                "item3": 0
                            },
                            "pregunta4": {
                                "si": 0,
                                "no": 0
                            },
                            "pregunta5": [0]
                        }
                    }).then(function () {
                        _this.mostrarSpinner = false;
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                            _this.LimpiarCampos();
                            //   this.navCtrl.pop();
                        }, 4000);
                    });
                    //});
                }).catch(function (error) {
                    var mensaje;
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            mensaje = "El correo ingresado no es válido.";
                            _this.correo = "";
                            break;
                        case "auth/email-already-in-use":
                            mensaje = "Este usuario ya fue registrado previamente.";
                            _this.correo = "";
                            break;
                        case "auth/weak-password":
                            mensaje = "La contraseña debe tener 6 o más caracteres.";
                            _this.pass = "";
                            break;
                        default:
                            mensaje = "Ups... Tenemos problemas técnicos.";
                            break;
                    }
                    _this.mostrarSpinner = false;
                    _this.presentToast(mensaje);
                });
            }
        })
            .catch(function (error) {
            var mensaje;
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    mensaje = "El correo ingresado no es válido.";
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este usuario ya fue registrado previamente.";
                    break;
                case "auth/weak-password":
                    mensaje = "La contraseña debe tener 6 o más caracteres.";
                    break;
                default:
                    mensaje = "Ups... Tenemos problemas técnicos.";
                    break;
            }
            _this.mostrarSpinner = false;
            _this.presentToast(mensaje);
        });
    };
    RegistroClientePage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    RegistroClientePage.prototype.RegistrarAnonimo = function () {
        var _this = this;
        if (!this.correo || !this.pass || !this.nombre) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        this.mostrarSpinner = true;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("usuarios");
        var correo = this.correo.toLowerCase();
        this.authInstance.auth.createUserWithEmailAndPassword(correo, this.pass)
            .then(function () {
            usuariosRef.push({
                nombre: _this.nombre,
                tipo: "anonimo",
                correo: correo,
                clave: _this.pass,
                img: _this.foto,
                "encuesta": {
                    "pregunta1": {
                        "pesimo": 0,
                        "malo": 0,
                        "mediocre": 0,
                        "bueno": 0,
                        "excelente": 0
                    },
                    "pregunta2": {
                        "si": 0,
                        "no": 0
                    },
                    "pregunta3": {
                        "item1": 0,
                        "item2": 0,
                        "item3": 0
                    },
                    "pregunta4": {
                        "si": 0,
                        "no": 0
                    },
                    "pregunta5": [0]
                }
            }).then(function () {
                _this.mostrarSpinner = false;
                _this.mostrarAlert = true;
                setTimeout(function () {
                    _this.mostrarAlert = false;
                    _this.LimpiarCampos();
                    // this.navCtrl.pop();
                }, 3000);
            });
        })
            .catch(function (error) {
            var mensaje;
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    mensaje = "El correo ingresado no es válido.";
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este usuario ya fue registrado previamente.";
                    break;
                case "auth/weak-password":
                    mensaje = "La contraseña debe tener 6 o más caracteres.";
                    break;
                default:
                    mensaje = "Ups... Tenemos problemas técnicos.";
                    break;
            }
            _this.mostrarSpinner = false;
            _this.presentToast(mensaje);
        });
    };
    //Valido que el dni no este en la base de datos
    //  let miusuariosRef = firebase.database().ref("usuarios");
    /* miusuariosRef.once("value", (snap) => {
   
       let data = snap.val();
       let esValido = true;
   
       for (let item in data) {
   
         if (data[item].dni == this.dni) {
   
           this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
           esValido = false;
          
           break;
         
       }
     }
     if (esValido) {
   
       let correo = this.correo.toLowerCase();
      
         
   
       this.authInstance.auth.createUserWithEmailAndPassword(this.correo, this.pass.toString())
             .then(() => {
               console.log("subo a la base");
            
            
                 miusuariosRef.push({
                   nombre: this.nombre,
                   apellido: this.apellido,
                   dni:this.dni,
                   correo:this.correo,
                   clave:this.pass,
                   tipo:"cliente",
                   img:this.foto
                 
                 }).then(() => {
                   alert("¡Éxito!,Se registró correctamente el cliente");
                   this.LimpiarCampos();
                  
               
                 });
               });
             });
           }
         })
           .catch(error => {
   
             let mensaje: string;
   
             console.log(error.code);
           });
          
   */
    RegistroClientePage.prototype.LimpiarCampos = function () {
        this.correo = undefined;
        this.pass = undefined;
        this.nombre = undefined;
        this.apellido = undefined;
        this.dni = undefined;
        this.foto = "";
    };
    RegistroClientePage.prototype.ElegirUsuario = function (tipo) {
        this.LimpiarCampos();
        this.prueba = "";
        this.formInicial = false;
        if (tipo == "anonimo") {
            this.clase = "anonimo";
            this.formAnon = true;
            this.formReg = false;
            this.ocultarCabecera = true;
        }
        if (tipo == "registrado") {
            this.clase = "registrado";
            this.formReg = true;
            this.formAnon = false;
            this.ocultarCabecera = true;
            //  (window.document.querySelector("#cab") as HTMLElement).style.display="none";
        }
    };
    RegistroClientePage.prototype.cerrarForm = function () {
        this.formInicial = true;
        this.formReg = false;
        this.formAnon = false;
        this.ocultarCabecera = false;
    };
    RegistroClientePage.prototype.tomarFoto = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto = "data:image/jpeg;base64," + imageData;
                _this.prueba = _this.foto;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    RegistroClientePage.prototype.scanear = function () {
        var _this = this;
        this.options = { prompt: "Escaneá tu DNI", formats: "PDF_417" };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            _this.miScan = (barcodeData.text).split('@');
            _this.apellido = _this.miScan[1];
            var unNombre = _this.miScan[2];
            //this.nombre = this.miScan[2];
            var nombres = unNombre.split(' ');
            _this.nombre = nombres[0];
            _this.dni = _this.miScan[4];
            alert(_this.miScan);
        }, function (error) {
            //this.errorHandler.mostrarErrorLiteral(error);
        });
        /*
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.scanedCode = text;
          try{
            this.scanedCode=JSON.parse(this.scanedCode);
            this.nombre =this.scanedCode.nombre;
            this.apellido=this.scanedCode.apellido;
            this.dni=this.scanedCode.dni;
          }
          catch(err)
          {

          }
         
          this.qrScanner.hide().then(() => {

           this.hideCamera();
          });
      
        
        });
    
         this.qrScanner.show().then(()=>{
    
          this.showCamera();
         });
    
    */
    };
    RegistroClientePage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    RegistroClientePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-registro-cliente',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\registro-cliente\registro-cliente.html"*/'<!--\n\n  Generated template for the RegistroClientePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.-->\n\n  <div class="alert" [ngClass]="{\'mostrarAlert\':mostrarAlert}">\n\n    <h1>El usuario se registr&oacute; exit&oacute;samente!!</h1>\n\n  </div>\n\n  <ion-header>\n\n  <ion-navbar color="dark" hideBackButton="true">\n\n\n\n    \n\n \n\n\n\n    <span class="tituloPagina">Registro </span>\n\n\n\n\n\n\n\n  \n\n    <ion-buttons start style="left: 3px;\n\n    position: absolute;">\n\n      <button ion-button (click)="Atras()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  \n\n<ion-content [ngClass]="{\'ocultar-fondo\':ocultarContenido}">\n\n<div class="vertical" [ngClass]="{\'ocultar2\':ocultarContenido}">\n\n  <app-spinner *ngIf="mostrarSpinner"></app-spinner>\n\n  <div class="form" *ngIf="formReg">\n\n    <img class="foto" [src]="prueba" *ngIf="prueba!=\'\'">\n\n  \n\n    <div class="elTituloForm">\n\n    <h2 class="tituloForm">Registro de Cliente</h2>\n\n \n\n    </div>\n\n    <input type="text" class="miInput" [(ngModel)]="nombre" placeholder="nombre" name="nombre"><br>\n\n    \n\n    <input type="text" class="miInput" placeholder="apellido" name="pass" [(ngModel)]="apellido"  ><br>\n\n    <input type="number" class="miInput" placeholder="D.N.I" name="pass" [(ngModel)]="dni" name="pass" ><br>\n\n    <input type="text" class="miInput" placeholder="Correo" name="pass" [(ngModel)]="correo"  ><br>\n\n    <input type="text" class="miInput" placeholder="Contraseña" name="pass" [(ngModel)]="pass" ><br>\n\n    <button ion-button color="dark" (click)="tomarFoto()">FOTO</button>\n\n    <button ion-button color="dark" (click)="scanear()">Leer DNI con QR</button>\n\n    <button id="btnRegistrar" ion-button color="dark" outline (click)="Registrar()">Registrar</button>\n\n  </div>\n\n  <div class="form"  *ngIf="formAnon">\n\n      <img class="foto" [src]="prueba" *ngIf="prueba!=\'\'">\n\n    <div class="elTituloForm">\n\n      <h2 class="tituloForm">An&oacute;nimo</h2>\n\n      <button ion-button class="btnCerrar" (click)="cerrarForm()" id="btnCerrar">\n\n          <ion-icon name="close"></ion-icon>\n\n\n\n        </button>\n\n    </div>\n\n      <input type="text" class="miInput" [(ngModel)]="nombre" placeholder="nombre" name="nombre"><br>\n\n      <input type="text" class="miInput" placeholder="Correo" name="pass" [(ngModel)]="correo"  ><br>\n\n      <input type="password" class="miInput"  placeholder="Contraseña" name="pass" [(ngModel)]="pass"  ><br>\n\n      <button ion-button color="dark" (click)="tomarFoto()">FOTO</button>\n\n    \n\n      <button id="btnRegistrar" ion-button color="dark" outline (click)="RegistrarAnonimo()">Registrar</button>\n\n    </div>\n\n  <div class="inicial" *ngIf="formInicial" >\n\n    <h1>Elija el tipo de usuario que desea ser:</h1>\n\n    <div class="botonesInicial">\n\n      <button ion-button (click)="ElegirUsuario(\'registrado\')" class="botonesInicio" color="dark">Cliente</button>\n\n      <button ion-button (click)="ElegirUsuario(\'anonimo\')" class="botonesInicio" color="dark">An&oacute;nimo</button>\n\n    </div>\n\n  </div>\n\n  \n\n</div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\registro-cliente\registro-cliente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegistroClientePage);
    return RegistroClientePage;
}());

//# sourceMappingURL=registro-cliente.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrIngresoLocalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__principal_principal__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the QrIngresoLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//FER EN LA LINEA 145 TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL.
var QrIngresoLocalPage = /** @class */ (function () {
    function QrIngresoLocalPage(navCtrl, navParams, authInstance, barcodeScanner, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.barcodeScanner = barcodeScanner;
        this.camera = camera;
        this.nombreAnonimo = "";
        this.tieneReserva = false;
        this.moment = __WEBPACK_IMPORTED_MODULE_6_moment__;
        this.mostrarAnonimo = false;
        this.desplegarHeader = false;
        //EL VALOR DE ESTE STRING FOTO DEBE SER VACIO
        this.foto = "";
        this.mostrarAlert2 = false;
        this.encuestas = [];
        this.mostrarEncuestasVacias = false;
        this.maximaMesa = 0;
        this.noHayEncuestas = false;
        this.mostrarAlert3 = false;
        this.mostrarMiSpinner = true;
        this.desplegarEncuesta = false;
        this.imgAnonimo = "assets/imgs/beta/anonimo.png";
        //ANTES DE SUBIR A GITHUB  DESCOMENTO STAS LINEAS:
        // this.correo="lucas@soylucas.com";
        //DESCOMENTAR PARA TRABAJAR A NIVEL LOCAL!!!!!!!
        // this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        //this.VerificarReserva();
        this.TraerEncuestas();
        this.ObtenerMesaMaxima();
        if (localStorage.getItem("anonimo") == "true") {
            this.mostrarAnonimo = true;
            this.mostrarMiSpinner = false;
            this.desplegarHeader = false;
        }
        else {
            //Aca hago lo otro si no es anonimo
            // this.VerificarReserva();
            this.desplegarHeader = true;
            this.VerificarEstado();
        }
    }
    QrIngresoLocalPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    QrIngresoLocalPage.prototype.TraerEncuestas = function () {
        var _this = this;
        console.log("En traer ecnuesta");
        var mensaje = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("encuestaCliente/");
        mensaje.once("value", function (snap) {
            var data = snap.val();
            console.log("Dentro de observable ecnuesta");
            _this.encuestas = [];
            for (var key in data) {
                _this.encuestas.push(data[key]);
                console.log(data);
            }
            console.log(_this.encuestas);
            if (_this.encuestas.length < 1) {
                _this.mostrarEncuestasVacias = true;
                //  this.noHayEncuestas=true;
                //this.desplegarEncuesta=false;
                console.log(_this.noHayEncuestas);
            }
        });
    };
    QrIngresoLocalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrIngresoLocalPage');
    };
    QrIngresoLocalPage.prototype.leerQr = function () {
        var _this = this;
        if (this.tieneReserva) {
            this.correo = localStorage.getItem("usuario");
            this.correo = (JSON.parse(this.correo)).correo;
            this.options = { prompt: "Escaneá el qr de la puerta", formats: 'QR_CODE' };
            this.barcodeScanner.scan(this.options).then(function (barcodeData) {
                var miScan = (barcodeData.text);
                if (barcodeData.text === "bienvenido") {
                    _this.mensaje = "Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
                    _this.mostrarAlert3 = true;
                    //Si es bienvenido y adémas no hay encuestas muestro la pagina negra y el relog de arena 
                    if (_this.mostrarEncuestasVacias) {
                        _this.noHayEncuestas = true;
                        _this.desplegarEncuesta = false;
                    }
                    else {
                        _this.desplegarEncuesta = true;
                        _this.noHayEncuestas = false;
                    }
                    _this.desplegarHeader = false;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 4500);
                    //Aca cambio el estado del usuario y escucho al cambio d este estado
                    var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
                    usuariosRef.once("value", function (snap) {
                        var data = snap.val();
                        var esValido = true;
                        var _loop_1 = function () {
                            if (data[key].correo == _this.correo) {
                                var usuario = data[key];
                                usuario.estado = "espera";
                                usuario.comensales = _this.comensales;
                                usuario.mesa = _this.mesa;
                                console.log(usuario);
                                var usuariosRef_1 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios/" + key);
                                _this.claveActual = key;
                                usuariosRef_1.set(usuario).then(function () {
                                    usuariosRef_1.on("value", function (snap) {
                                        var data = snap.val();
                                        console.log(data);
                                        if (data.estado != "espera") {
                                            //FER EN ESTA LINEA TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__principal_principal__["a" /* PrincipalPage */]);
                                        }
                                    });
                                });
                            }
                        };
                        for (var key in data) {
                            _loop_1();
                        }
                    });
                }
                else {
                    _this.mensaje = "Qr no valido";
                    _this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        return;
                    }, 3000);
                }
            }, function (error) {
                //this.errorHandler.mostrarErrorLiteral(error);
            });
        }
        else {
            this.correo = localStorage.getItem("usuario");
            this.correo = (JSON.parse(this.correo)).correo;
            this.options = { prompt: "Escaneá el qr de la puerta", formats: 'QR_CODE' };
            this.barcodeScanner.scan(this.options).then(function (barcodeData) {
                var miScan = (barcodeData.text);
                if (barcodeData.text === "bienvenido") {
                    _this.mensaje = "Bienvenido!! Se ha anunciado con éxito, en breve vendra el mozo a atenderlo";
                    _this.mostrarAlert3 = true;
                    _this.desplegarEncuesta = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 3000);
                    //Aca cambio el estado del usuario y escucho al cambio d este estado
                    var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
                    usuariosRef.once("value", function (snap) {
                        var data = snap.val();
                        var esValido = true;
                        var _loop_2 = function () {
                            if (data[key].correo == _this.correo) {
                                var usuario = data[key];
                                usuario.estado = "espera";
                                usuario.comensales = _this.comensales;
                                console.log(usuario);
                                var usuariosRef_2 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios/" + key);
                                _this.claveActual = key;
                                usuariosRef_2.set(usuario).then(function () {
                                    usuariosRef_2.on("value", function (snap) {
                                        var data = snap.val();
                                        console.log(data);
                                        if (data.estado != "espera") {
                                            //FER EN ESTA LINEA TENES QUE CAMBIAR EL ROOT PAGE A PRINCIPAL
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__principal_principal__["a" /* PrincipalPage */]);
                                        }
                                    });
                                });
                            }
                        };
                        for (var key in data) {
                            _loop_2();
                        }
                    });
                }
                else {
                    _this.mensaje = "Qr no valido";
                    _this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        return;
                    }, 3000);
                }
            }, function (error) {
                //this.errorHandler.mostrarErrorLiteral(error);
            });
        }
    };
    QrIngresoLocalPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    QrIngresoLocalPage.prototype.tomarFoto = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 300,
                targetHeight: 300,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto = "data:image/jpeg;base64," + imageData;
                _this.imgAnonimo = _this.foto;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    QrIngresoLocalPage.prototype.AceptarAlert2 = function () {
        var _this = this;
        if (this.maximaMesa == 0) {
            this.mensaje = "No hay mesas cargadas en el salón";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        if (this.comensales < 1) {
            this.mensaje = "La cantidad de comensales mínima es de 1";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (this.comensales > this.maximaMesa) {
            this.mensaje = "La cantidad de comensales máxima es de " + this.maximaMesa;
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (!this.comensales) {
            this.mensaje = "Debe ingresar un número";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        this.mostrarAlert2 = false;
        /*   console.log(localStorage.getItem("anonimo").toString());
          
           if(  localStorage.getItem("anonimo")=="true")
           {
           
             this.mostrarAnonimo=true;
       
           }*/
    };
    QrIngresoLocalPage.prototype.aceptarAnonimo = function () {
        var _this = this;
        if (!this.nombreAnonimo) {
            this.mensaje = "Debe ingresar un nombre";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        if (!this.foto) {
            this.mensaje = "Debe tomar una foto";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.comensales = undefined;
            }, 2000);
            return;
        }
        this.mostrarAnonimo = false;
        //Guardo el anonimo en firebase
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios/");
        var raiz = usuariosRef.push({ nombre: this.nombreAnonimo, tipo: "anonimo", img: this.foto }).key;
        var ref2 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios/" + raiz);
        ref2.update({ correo: raiz });
        var unUsuario = {
            nombre: this.nombreAnonimo,
            tipo: "anonimo",
            img: this.foto,
            correo: raiz
        };
        localStorage.setItem("usuario", JSON.stringify(unUsuario));
        this.mostrarAlert2 = true;
    };
    QrIngresoLocalPage.prototype.VerificarReserva = function () {
        var _this = this;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("reservas");
        usuariosRef.once("value", function (snap) {
            console.log("En verificar Reserva");
            var data = snap.val();
            var esValido = true;
            var hayReserva = false;
            for (var key in data) {
                console.log("reservas:" + data[key]);
                //Verifico si hay una reserva confirmada
                if (data[key].estado == "confirmada" && data[key].correo == _this.correo) {
                    console.log("Este cliente tiene reservaaaa");
                    var momentoReserva = __WEBPACK_IMPORTED_MODULE_6_moment__(data[key].horario, "DD/MM/YYYY HH:mm");
                    console.log(momentoReserva);
                    var momentoActual = __WEBPACK_IMPORTED_MODULE_6_moment__(new Date(), "DD/MM/YYYY HH:mm");
                    console.log(momentoActual);
                    console.log(Math.abs(momentoActual.diff(momentoReserva, "m")));
                    // if(Math.abs(momentoReserva.diff(momentoActual, "m")) <= 40)
                    if (momentoReserva.diff(momentoActual, "m") > -40 && momentoReserva.diff(momentoActual, "m") < 20) {
                        hayReserva = true;
                        _this.tieneReserva = true;
                        _this.mesa = data[key].mesa;
                        _this.comensales = data[key].cantidadPersonas;
                        _this.mostrarAlert2 = false;
                        _this.mostrarMiSpinner = false;
                        return;
                    }
                    else {
                        console.log("Pero la reserva es de mas tarde no de ahoraa");
                        _this.mostrarMiSpinner = false;
                        _this.mostrarAlert2 = true;
                        return;
                    }
                    //Aca debo restar el momento actual menos el de la reserva 
                    //si es menor a 50 
                    //Cambio el estado a espera
                }
            }
            if (!hayReserva) {
                _this.mostrarMiSpinner = false;
                _this.mostrarAlert2 = true;
                return;
            }
        });
    };
    QrIngresoLocalPage.prototype.ObtenerMesaMaxima = function () {
        var _this = this;
        var mesaMaxima = 0;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("mesas");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            var hayReserva = false;
            for (var key in data) {
                if (data[key].cantidadComensales > mesaMaxima) {
                    mesaMaxima = data[key].cantidadComensales;
                }
            }
            _this.maximaMesa = mesaMaxima;
        });
    };
    QrIngresoLocalPage.prototype.VerificarEstado = function () {
        var _this = this;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            console.log("En verificar estado");
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    //Pregunto si esta seteado el estado para que no pinche la app
                    if (data[key].estado) {
                        //Si ese estado que ahora se que esta seteado por que estoy dentro del if 
                        //es en espera directamente le muestro las encuestas de usuarios
                        if (data[key].estado == "espera") {
                            if (_this.mostrarEncuestasVacias) {
                                _this.noHayEncuestas = true;
                                _this.desplegarEncuesta = false;
                                _this.desplegarHeader = false;
                                _this.mostrarMiSpinner = false;
                            }
                            else {
                                _this.mostrarMiSpinner = false;
                                _this.desplegarEncuesta = true;
                                _this.desplegarHeader = false;
                            }
                        }
                        else {
                            _this.VerificarReserva();
                        }
                    }
                    else {
                        _this.VerificarReserva();
                    }
                }
            }
        }).catch(function () { return console.log("por las dudas"); });
    };
    QrIngresoLocalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-qr-ingreso-local',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\qr-ingreso-local\qr-ingreso-local.html"*/'<!--\n\n  Generated template for the QrIngresoLocalPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n\n\n<div class="anonimo" [ngClass]="{\'mostrarAnonimo\':mostrarAnonimo}">\n\n  <div class="regAnonimo">\n\n    <img class="imgAnonimo" [src]="imgAnonimo">\n\n\n\n    <input type="text" [(ngModel)]="nombreAnonimo" placeholder="Ingrese su nombre">\n\n    <button ion-button class="fotoAnonimo" (click)="tomarFoto()" color="red">\n\n       \n\n        <ion-icon name="camera" style="font-size:2em"></ion-icon>\n\n  </button>\n\n  <button ion-button  style="width:50%; margin-left:25%;" (click)="aceptarAnonimo()" color="red">Aceptar</button>\n\n\n\n  </div>\n\n</div>\n\n\n\n<div class="alert3" [ngClass]="{\'mostrarAlert3\':mostrarAlert3}">\n\n    <h1>{{mensaje}}</h1>\n\n  </div>\n\n  \n\n\n\n\n\n  <!-- <ion-header *ngIf="desplegarHeader">\n\n    <ion-navbar color="red" hideBackButton="true">\n\n  \n\n      \n\n   \n\n  \n\n      <ion-buttons start style="left: 3px;\n\n      position: absolute;">\n\n        <button ion-button (click)="Atras()">\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons> -->\n\n  \n\n      <!-- <ion-title>{{sala}}</ion-title> -->\n\n      <!-- <p class="su    <ion-buttons end>\n\n        <button ion-button>\n\n          <ion-icon name="power"></ion-icon>\n\n        </button>\n\n      </ion-buttons>btitle" style="color: white;">{{usuario.mail}}</p> -->\n\n  \n\n      <!-- <ion-buttons end>\n\n        <button ion-button >\n\n          <ion-icon name="power"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  \n\n    </ion-navbar>\n\n  </ion-header> -->\n\n  \n\n\n\n<ion-content >\n\n\n\n    <div class="elAlert2" [ngClass]="{\'mostrarAlert2\':mostrarAlert2}">\n\n        <div class="alert2" >\n\n          <h1>Ingrese por favor la cantidad de comensales</h1>\n\n          <input type="number"[(ngModel)]="comensales">\n\n          <button ion-button color="dark" (click)="AceptarAlert2()">Aceptar</button>\n\n         \n\n        </div>\n\n        </div>\n\n\n\n  <div class="miSpinner" *ngIf="mostrarMiSpinner">\n\n    <img src="assets/imgs/beta/elLogo.png" class="pulse">\n\n    </div>\n\n  <div class="vacio"  [ngClass]="{\'sinEncuestas\':noHayEncuestas}">\n\n    <img src="assets/imgs/beta/Reloj.png">\n\n      <h1 class="tituloSinEncuestas">En breve lo atenderá un mozo, y le dara una mesa.</h1>\n\n\n\n  </div>\n\n    <div class="encuestas"  [ngClass]="{\'desplegar\':desplegarEncuesta}" >\n\n      <h1 class="tituloEncuestas">Opiniones de nuestros clientes</h1>\n\n  \n\n      <img *ngIf="desplegarEncuesta" class="encuestaImg" src="assets/imgs/beta/Reloj.png">\n\n          <div class="encuesta1" *ngFor="let encuesta of encuestas">\n\n          <h2 class="tituloEncuesta1">{{encuesta.cliente}}</h2>\n\n\n\n          <div class="pregResp">\n\n          <h3 class="PreguntaEncuesta1">¿Se sintió cómodo en el restaurante?</h3>\n\n          <p class="respEncuesta1">{{encuesta.preg1}}</p>\n\n          </div>\n\n          <div class="pregResp">\n\n          <h3 class="PreguntaEncuesta1"> ¿Cómo calificar&iacute;a la atenci&oacute;n?</h3>\n\n          <p class="respEncuesta1 preg4">{{encuesta.preg2}}</p>\n\n          </div>\n\n          <div class="pregResp">\n\n          <h3 class="PreguntaEncuesta1"> ¿Qué tan buenos son nuestros platos?</h3>\n\n          <p class="respEncuesta1 preg4" >{{encuesta.preg4|elPipe}}</p>\n\n          </div>\n\n          <div class="pregResp">\n\n          <h3 class="PreguntaEncuesta1"> ¿Del 1 al 10, qué puntaje le pondría al restaurante?</h3>\n\n          <p class="respEncuesta1"> {{encuesta.preg5}}</p>\n\n          </div>\n\n          <div class="fotos" >\n\n            <h1 *ngIf="encuesta.foto1 !=\'\'||encuesta.foto2 !=\'\'||encuesta.foto3 !=\'\'">Fotos de  las encuesta:</h1>\n\n            <div class="subFotos">\n\n              \n\n              <img  *ngIf="encuesta.foto1 !=\'\'" [src]="encuesta.foto1">\n\n              <img *ngIf="encuesta.foto2 !=\'\'" [src]="encuesta.foto2">\n\n              <img *ngIf="encuesta.foto3 !=\'\'" [src]="encuesta.foto3">\n\n              </div>\n\n              </div>\n\n          </div>\n\n    \n\n        <!--div class="encuesta1">\n\n          <h2 class="tituloEncuesta1">Cliente:Cliente nombre</h2>\n\n          <h3 class="PreguntaEncuesta1">¿Qu&eacute;  piensa qu&eacute; es lo mejor del restaurante?</h3>\n\n          <p class="respEncuesta1">TOOODO</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Como calificar&iacute;a la atenci&oacute;n?</h3>\n\n          <p class="respEncuesta1">bUENA</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Del 1 al 10 que tan buenos son nuestros platos?</h3>\n\n          <p class="respEncuesta1">10</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Se sintio c&oacute;modo en nuestro restaurante?</h3>\n\n          <p class="respEncuesta1"> SI</p>\n\n          <!div class="fotos">\n\n              <img  *ngIf="encuesta.foto1 !=\'\'" [src]="encuesta.foto1">\n\n              <img *ngIf="encuesta.foto2 !=\'\'" [src]="encuesta.foto2">\n\n              <img *ngIf="encuesta.foto3 !=\'\'" [src]="encuesta.foto3">\n\n              </div>\n\n          </div>\n\n        </div-->\n\n        \n\n   \n\n\n\n      \n\n\n\n     \n\n  \n\n        \n\n        <!--div class="encuesta1" *ngFor="let encuesta of encuestas">\n\n          <h2 class="tituloEncuesta1">Cliente:{{encuesta.cliente}}</h2>\n\n          <h3 class="PreguntaEncuesta1">¿Qu&eacute;  piensa qu&eacute; es lo mejor del restaurante?</h3>\n\n          <p class="respEncuesta1">{{encuesta.preg5}}</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Como calificar&iacute;a la atenci&oacute;n?</h3>\n\n          <p class="respEncuesta1">{{encuesta.preg2}}</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Del 1 al 10 que tan buenos son nuestros platos?</h3>\n\n          <p class="respEncuesta1">{{encuesta.preg4}}</p>\n\n          <h3 class="PreguntaEncuesta1"> ¿Se sintio c&oacute;modo en nuestro restaurante?</h3>\n\n          <p class="respEncuesta1"> {{encuesta.preg1}}</p>\n\n    <  \n\n          <div class="fotos">\n\n            <img  *ngIf="encuesta.foto1 !=\'\'" [src]="encuesta.foto1">\n\n            <img *ngIf="encuesta.foto2 !=\'\'" [src]="encuesta.foto2">\n\n            <img *ngIf="encuesta.foto3 !=\'\'" [src]="encuesta.foto3">\n\n            </div>\n\n        </div>\n\n\n\n      </div-->\n\n    \n\n      </div>\n\n  <div class="contenido">\n\n    <h1 class="tituloPag">¡Bienvenido!</h1>\n\n    <p class="info">Lea el c&oacute;digo QR de la puerta para anunciarse en lista de espera.</p>\n\n    <button class="btnQr1" (click)="leerQr()" ion-button color="red">Leer QR</button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\qr-ingreso-local\qr-ingreso-local.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */]])
    ], QrIngresoLocalPage);
    return QrIngresoLocalPage;
}());

//# sourceMappingURL=qr-ingreso-local.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedirPlatosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PedirPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PedirPlatosPage = /** @class */ (function () {
    function PedirPlatosPage(navCtrl, navParams, authInstance, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.contErrores = 0;
        this.animacionMonto = true;
        this.mostrarSpinnerMonto = true;
        this.ocultarMontoPrincipal = true;
        this.mostrarAlert = false;
        this.erroresPedidos = 0;
        this.platos = [];
        this.bebidas = [];
        this.mostrarSpinner = false;
        this.mostrarAlert2 = false;
        this.ocultarMonto = true;
        this.mostrarAlert3 = false;
        this.miValor = undefined;
        this.esDelivery = false;
        this.eligio = false;
        this.yaPidio = false;
        this.cantidadNueva = undefined;
        this.apreto = 1;
        this.tiempoPedido = 0;
        this.pedido = [];
        this.for = "let plato of platos";
        this.monto = 0;
        this.montoPlatos = 0;
        this.montoBebidas = 0;
        this.ocultarElMonto = false;
        this.mostrarSpinnerPlatos = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.ocultarPlatos = true;
        this.ocultarBebidas = true;
        this.mostrarslide = false;
        this.TraerPlatos();
        this.contador = 0;
        this.tipo1 = localStorage.getItem("usuario");
        this.tipo1 = (JSON.parse(this.tipo1)).tipo;
        this.ocultarTitulo = false;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos...";
        this.foto = "";
        //DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!!!
        //this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        if (this.tipo1 == "mozo") {
            this.mostrarAlert2 = true;
            return;
        }
        this.TraerTipoMesa();
    }
    PedirPlatosPage.prototype.onChangeTime = function (value) {
        this.cantidad = value;
    };
    PedirPlatosPage.prototype.ionViewDidLoad = function () {
    };
    PedirPlatosPage.prototype.CancelarAlert2 = function () {
        this.navCtrl.pop();
    };
    PedirPlatosPage.prototype.AceptarAlert2 = function () {
        var _this = this;
        var valida = true;
        //Valido el campo de la mesa
        if (!this.mesa) {
            valida = false;
            this.mensaje = "Ingrese el numero de mesa";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos";
            }, 2000);
            return;
        }
        //Valido que la mesa exista:
        var mensaje = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("mesas/");
        mensaje.once("value", function (snap) {
            var esta = false;
            var ocupada = false;
            var data = snap.val();
            for (var item in data) {
                if (data[item].numeroMesa == _this.mesa) {
                    console.log(_this.mesa);
                    console.log(data[item].estado);
                    esta = true;
                    if (data[item].estado == "ocupada") {
                        ocupada = true;
                    }
                }
            }
            if (!esta) {
                _this.presentToast("El numero de mesa ingresado no existe!!");
                return;
            }
            else {
                //Aca valido que la mesa no esta ocupada
                if (!ocupada) {
                    _this.presentToast("La mesa ingresada no es la corrcta ya que esta vacia");
                    return;
                }
                else {
                    _this.mostrarAlert2 = false;
                    _this.TraerClaveMozo();
                    _this.CalcularMonto();
                }
            }
        });
        //Valido que la mesa no este ocupada
    };
    PedirPlatosPage.prototype.swipeLeftEvent = function ($event) {
        console.log($event.direction);
        if ($event.direction == 4) {
            if (this.contador == 0) {
                return;
            }
            if (this.contador == 1) {
                this.foto = this.foto1;
                this.contador = 0;
                return;
            }
            if (this.contador == 2) {
                this.foto = this.foto2;
                this.contador = 1;
                return;
            }
        }
        if ($event.direction == 2) {
            if (this.contador == 0) {
                this.foto = this.foto2;
                this.contador = 1;
                return;
            }
            if (this.contador == 1) {
                this.foto = this.foto3;
                this.contador = 2;
                return;
            }
            if (this.contador == 2) {
                return;
            }
        }
    };
    PedirPlatosPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    PedirPlatosPage.prototype.ElegirPlato = function (nombre, valor, es, tiempo, para, precio, id) {
        //this.miValor=undefined;
        var _this = this;
        if (parseInt(valor) <= 0 || valor == undefined || valor == "") {
            if (this.contErrores == 3) {
                this.contErrores = 0;
                this.mensaje = "Coloque la cantidad del elemento del menu";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.mensaje = "Su pedido ha sido enviado en breve se lo llevaremos...";
                }, 3000);
                return;
            }
            this.contErrores++;
            return;
        }
        if (parseInt(valor) > 20) {
            this.mensaje = "La cantidad del elemento del menú no puede ser mayor a 20.";
            this.mostrarAlert3 = true;
            this.valorPlatos = 0;
            this.valor = null;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.mensaje = "Su pedido ha sido enviado en bréve se lo llevaremos...";
            }, 3000);
            return;
        }
        if (tiempo == "cero") {
            tiempo = 0;
        }
        this.pedido.push({ cant: valor, nombre: nombre, es: es, tiempo: tiempo, para: para, precio: precio, id: id });
        console.log("Elegi" + this.pedido[this.pedido.length - 1]);
        window.document.querySelector('#' + id).classList.add("mostrarElegido");
        console.log(this.pedido);
        //Si es plato le sumo el monto a plato si es bebida a bebida:
        var total = 0;
        if (es == "plato") {
            var sumar = parseInt(valor) * parseInt(precio);
            console.log(sumar);
            this.montoPlatos = this.montoPlatos + sumar;
            total = sumar;
        }
        else {
            var sumar = parseInt(valor) * parseInt(precio);
            console.log(sumar);
            this.montoBebidas = this.montoBebidas + sumar;
            total = sumar;
        }
        this.monto = this.monto + total;
    };
    PedirPlatosPage.prototype.mostrarSlide = function (foto1, foto2, foto3, nombre, desc) {
        this.foto = foto1;
        this.foto1 = foto1;
        this.foto2 = foto2;
        this.foto3 = foto3;
        this.nombre = nombre;
        this.desc = desc;
        this.mostrarslide = true;
    };
    PedirPlatosPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Mesa',
            inputs: [
                {
                    name: 'mesa',
                    placeholder: 'Ingrese numero de mesa'
                },
                {
                    name: 'number',
                    placeholder: 'numero',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        _this.mesa = data;
                    }
                }
            ]
        });
        alert.present();
    };
    PedirPlatosPage.prototype.Platos = function () {
        this.mostrarSpinnerPlatos = true;
        if ((this.platos.length > 0)) {
            this.mostrarSpinnerPlatos = false;
        }
        this.ocultarPlatos = false;
        this.ocultarTitulo = true;
        this.titulo = "Nuestros platos";
        this.ocultarMonto = false;
    };
    PedirPlatosPage.prototype.Bebidas = function () {
        this.mostrarSpinnerPlatos = true;
        if ((this.platos.length > 0)) {
            this.mostrarSpinnerPlatos = false;
        }
        this.miValor = undefined;
        this.ocultarPlatos = true;
        this.valor = undefined;
        this.ocultarBebidas = false;
        this.ocultarTitulo = true;
        this.titulo = "Nuestras bebidas";
        this.ocultarMonto = false;
    };
    PedirPlatosPage.prototype.Cerrar = function () {
        //Esta la pongo de prueba
        this.ocultarPlatos = true;
        this.ocultarTitulo = false;
        this.ocultarBebidas = true;
        this.ocultarMonto = true;
        if (this.monto == 0) {
            console.log("no se tendria  que ver el monto");
            this.ocultarMontoPrincipal = true;
        }
        else {
            console.log("se tendria  que ver el monto");
            this.ocultarMontoPrincipal = false;
        }
        // this.ocultarMontoPrincipal=false;
    };
    PedirPlatosPage.prototype.cerrarSlide = function () {
        this.mostrarslide = false;
        this.contador = 0;
    };
    PedirPlatosPage.prototype.TraerPlatos = function () {
        var _this = this;
        var mensaje = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("platos/");
        mensaje.on("value", function (snap) {
            var data = snap.val();
            _this.platos = [];
            _this.bebidas = [];
            for (var key in data) {
                if (data[key].carga.es == "plato") {
                    _this.platos.push(data[key]);
                    _this.platos[_this.platos.length - 1].MiCantidad = undefined;
                    var nombre = (_this.platos[_this.platos.length - 1].carga.nombre).split(" ");
                    console.log(_this.platos[_this.platos.length - 1].carga.nombre);
                    if (nombre.length > 1) {
                        var nombreFinal = "";
                        for (var i = 0; i < nombre.length; i++) {
                            nombreFinal = nombreFinal + nombre[i];
                        }
                        _this.platos[_this.platos.length - 1].carga.id = nombreFinal;
                        console.log("id compuesto de nombre" + _this.platos[_this.platos.length - 1].carga.id);
                    }
                    else {
                        _this.platos[_this.platos.length - 1].carga.id = _this.platos[_this.platos.length - 1].carga.nombre;
                        console.log("id  de nombre simple" + _this.platos[_this.platos.length - 1].carga.id);
                    }
                }
                else {
                    _this.bebidas.push(data[key]);
                    _this.bebidas[_this.bebidas.length - 1].MiCantidad = undefined;
                    var nombre = (_this.bebidas[_this.bebidas.length - 1].carga.nombre).split(" ");
                    if (nombre.length > 1) {
                        var nombreFinal = "";
                        for (var i = 0; i < nombre.length; i++) {
                            nombreFinal = nombreFinal + nombre[i];
                        }
                        _this.bebidas[_this.bebidas.length - 1].carga.id = nombreFinal;
                    }
                    else {
                        _this.bebidas[_this.bebidas.length - 1].carga.id = _this.bebidas[_this.bebidas.length - 1].carga.nombre;
                    }
                }
            }
            _this.mostrarSpinnerPlatos = false;
        });
    };
    PedirPlatosPage.prototype.AceptarPedido = function () {
        this.eligio = true;
        this.Cerrar();
    };
    PedirPlatosPage.prototype.CancelarPedido = function (cual) {
        this.valorPlatos = null;
        if (cual == "plato") {
            this.monto = this.monto - this.montoPlatos;
            this.montoPlatos = 0;
            this.valorPlatos = null;
            //Solo estoy probando la variable si funca aca tambien  
        }
        else {
            this.monto = this.monto - this.montoBebidas;
            this.montoBebidas = 0;
            this.valor = null;
            console.log("valor " + this.valor);
        }
        this.eligio = false;
        console.log("elementos en array pedidios" + this.pedido.length);
        var posicionBorrar = [];
        for (var i = 0; i < this.pedido.length; i++) {
            console.log("Le saco la selecccion a ");
            if (this.pedido[i].es == cual) {
                window.document.querySelector('#' + this.pedido[i].id).classList.remove("mostrarElegido");
                //  this.pedido.splice(i, 1);
                //Guardo las posiciones del array que tengo que borrar
                posicionBorrar.push(i);
                this.pedido[i] = null;
                //console.log("Deberia borrar este pedido:" + this.pedido[i]);
                //console.log("Esta es la posicion : " + i);
            }
        }
        //Aca cargo el array de pedidos con elementos del pedido que no hallan sido borrados
        var pedidoSec = [];
        for (var i = 0; i < this.pedido.length; i++) {
            if (this.pedido[i] != null) {
                pedidoSec.push(this.pedido[i]);
            }
            //  this.pedido.splice(posicionBorrar[i], 1);
        }
        this.pedido = pedidoSec;
        // this.pedido.splice(0, this.pedido.length);
        this.Cerrar();
        console.log(this.pedido);
    };
    PedirPlatosPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    PedirPlatosPage.prototype.PedirFinal = function () {
        var _this = this;
        if (this.erroresPedidos == 3) {
            this.erroresPedidos = 0;
            this.mensaje = "Para agregar un plato o bebida a su orden, coloque una cantidad del plato que desea y presione sobre el botón elegir del plato.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 7000);
            return;
        }
        if (this.pedido.length <= 0) {
            this.erroresPedidos++;
            this.mensaje = "No agrego ningun pedido a la orden.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        this.mostrarSpinner = true;
        var mensaje = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("pedidos/" + this.mesa + "/cocinero");
        var mensaje2 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("pedidos/" + this.mesa + "/bartender");
        var tiempoMax = 0;
        var nodoPadre;
        var tieneBartender = false;
        var tieneCocinero = false;
        for (var i = 0; i < this.pedido.length; i++) {
            console.log(this.pedido[i].para);
            if (this.pedido[i].para == "bartender") {
                console.log("El de abajo es de bartender");
                console.log(this.pedido[i]);
                tieneBartender = true;
                mensaje2.push({ nombre: this.pedido[i].nombre, cantidad: this.pedido[i].cant, precio: this.pedido[i].precio });
            }
            if (this.pedido[i].para == "cocinero") {
                console.log("El de abajo es de cocinero");
                console.log(this.pedido[i]);
                tieneCocinero = true;
                if (tiempoMax < this.pedido[i].tiempo) {
                    tiempoMax = this.pedido[i].tiempo;
                }
                console.log(this.pedido[i].nombre);
                mensaje.push({ nombre: this.pedido[i].nombre, cantidad: this.pedido[i].cant, precio: this.pedido[i].precio });
                this.yaPidio = true;
            }
        }
        if (tieneCocinero) {
            mensaje.update({ estado: "tomado" }).then(function () {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            });
        }
        if (tieneBartender) {
            mensaje2.update({ estado: "tomado" }).then(function () {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            });
            ;
        }
        //Establecer tiempo:
        var refTiempo = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("pedidos/" + this.mesa);
        refTiempo.once("value", function (snap) {
            var data = snap.val();
            var tiempo = data.tiempo;
            if (!tiempo || tiempo < tiempoMax) {
                var mensaje3 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("pedidos/" + _this.mesa);
                mensaje3.update({ tiempo: tiempoMax }).then(function () {
                    for (var i = 0; i < _this.pedido.length; i++) {
                        window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                    }
                    _this.pedido = [];
                });
            }
            if (tiempo > tiempoMax) {
                for (var i = 0; i < _this.pedido.length; i++) {
                    window.document.querySelector('#' + _this.pedido[i].id).classList.remove("mostrarElegido");
                }
                _this.pedido = [];
            }
        });
        //Guardo el estado pidio  al cliente
        if (!this.esDelivery) {
            var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("usuarios/" + this.claveUsuarioActual);
            usuariosRef.update({ estado: "pidio" }).then(function () {
                console.log(_this.claveUsuarioActual);
                console.log("No delivery");
                _this.mostrarSpinner = false;
                _this.mensaje = "El pedido ha sido enviado en breve se lo llevaremos";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.navCtrl.pop();
                }, 4000);
            });
        }
        else {
            var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("usuarios/" + this.claveUsuarioActual);
            usuariosRef.update({ estado: "delivery" }).then(function () {
                console.log(" delivery");
                console.log(_this.claveUsuarioActual);
                _this.mostrarSpinner = false;
                _this.mensaje = "El pedido ha sido enviado en breve se lo llevaremos";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.navCtrl.pop();
                }, 4000);
            });
        }
    };
    PedirPlatosPage.prototype.TraerClaveMozo = function () {
        var _this = this;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].mesa == _this.mesa) {
                    _this.claveUsuarioActual = key;
                    break;
                }
            }
            console.log(_this.mesa + _this.tipo);
        });
    };
    PedirPlatosPage.prototype.TraerTipoMesa = function () {
        var _this = this;
        console.log("Estoy trayendo la mesa");
        /*   if(this.tipo1=="mozo")
            {
              return;
            }*/
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    _this.tipo = data[key].tipo;
                    if (_this.tipo != "mozo") {
                        //Si no tiene mesa la mesa va a ser su correo
                        if (!data[key].mesa) {
                            _this.mesa = _this.correo;
                            //Le saco el arroba y el punto al string
                            var patron = '@';
                            var nuevo = '';
                            var cadena = _this.mesa.replace(patron, nuevo);
                            patron = '.';
                            nuevo = '';
                            cadena = cadena.replace(patron, nuevo);
                            _this.mesa = cadena;
                            _this.esDelivery = true;
                            _this.claveUsuarioActual = key;
                            //Le pongo estado al cliente como delivery
                            //   let usuario= data[key];
                            // usuario.estado="delivery";
                            /*   this.usuarioDelivery=data[key];
                               this.usuarioDelivery.estado="delivery";
                              
                            
                               //let usuariosRef = firebase.database().ref("usuarios/"+key);
                            
                               //usuariosRef.set(usuario);*/
                            _this.CalcularMonto();
                            return;
                        }
                        else {
                            _this.mesa = data[key].mesa;
                            console.log(_this.mesa);
                            _this.claveUsuarioActual = key;
                            _this.CalcularMonto();
                            return;
                        }
                    }
                    if (_this.tipo1 == "mozo") {
                        console.log("Soy mozo");
                        _this.CalcularMonto();
                        if (data[key].mesa == _this.mesa) {
                            _this.claveUsuarioActual = key;
                        }
                    }
                    break;
                }
            }
        });
    };
    PedirPlatosPage.prototype.CalcularMonto = function () {
        var _this = this;
        console.log("soy: " + this.correo);
        console.log("Estoy en sunmar montos");
        var montos = [];
        var montoGuardado = 0; //ACA ME FIJO EL MONTO DE LA MESA
        var usuariosRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("pedidos").child(this.mesa);
        usuariosRef2.once("value", function (snap) {
            var data = snap.val();
            if (data == null) {
                _this.monto = 0;
            }
            for (var item in data) {
                for (var subItem in data[item]) {
                    montos.push(data[item][subItem]);
                    console.log("esto estoy pusheando a montos" + data[item][subItem]);
                }
            }
            console.log(montos);
            //SUMO LOS VALORES:
            for (var i = 0; i < montos.length - 1; i++) {
                console.log(montos[i]);
                console.log("cantidad " + montos[i].cantidad);
                console.log("precio " + montos[i].precio);
                //Fijarme Si esto se soluciona.
                if (montos[i] != "tomado" && montos[i] != "preparacion" && montos[i] != "terminado" && montos[i] != "1" && montos[i] != "0" && montos[i] != "%") {
                    console.log("cantidad " + montos[i].cantidad);
                    console.log("precio " + montos[i].precio);
                    var suma = parseInt(montos[i].cantidad) * montos[i].precio;
                    console.log(suma);
                    console.log(montos[i]);
                    console.log("cantidad " + montos[i].cantidad);
                    console.log("precio " + montos[i].precio);
                    montoGuardado = montoGuardado + suma;
                }
            }
            _this.monto = montoGuardado;
            _this.mostrarSpinnerMonto = false;
            _this.animacionMonto = false;
            _this.ocultarElMonto = true;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cant'),
        __metadata("design:type", Object)
    ], PedirPlatosPage.prototype, "cant", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cant2'),
        __metadata("design:type", Object)
    ], PedirPlatosPage.prototype, "cant2", void 0);
    PedirPlatosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pedir-platos',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\pedir-platos\pedir-platos.html"*/'\n\n<div class="alert" [ngClass]="{\'mostrarAlert\':mostrarAlert}">\n\n    <h1>{{mensaje}}</h1>\n\n  </div>\n\n  <div class="soyAlert3" [ngClass]="{\'mostrarAlert2\':mostrarAlert3}">\n\n  <div class="alert3" >\n\n    \n\n  \n\n    <h1>{{mensaje}}</h1>\n\n  </div>\n\n</div>\n\n  <div class="elAlert2" [ngClass]="{\'mostrarAlert2\':mostrarAlert2}">\n\n  <div class="alert2" >\n\n    <h1>Ingrese por favor el n&uacute;mero de mesa</h1>\n\n    <input type="number"[(ngModel)]="mesa">\n\n    <button ion-button color="dark" (click)="AceptarAlert2()">Aceptar</button>\n\n    <button ion-button color="dark" (click)="CancelarAlert2()">Cancelar</button>\n\n  </div>\n\n  </div>\n\n<div class="platos" [ngClass]="{\'ocultar\':ocultarPlatos}">\n\n\n\n\n\n  <app-spinner *ngIf="mostrarSpinnerPlatos"></app-spinner>\n\n    <h1 class="tituloPlatos"  >{{titulo}}:</h1>\n\n\n\n    <div class="elPlato">\n\n \n\n      <div class="plato"  *ngFor="let plato of platos">\n\n        \n\n          <div class="elegido" [id]="plato.carga.id">\n\n            \n\n              <img src="assets/imgs/beta/ok.png" id="img">\n\n              </div>\n\n             \n\n        <img [src]="plato.carga.foto1" class="platoImagen" (click)="mostrarSlide(plato.carga.foto1,plato.carga.foto2,plato.carga.foto3,plato.carga.nombre,plato.carga.desc)" ><h2>{{plato.carga.nombre}}</h2> \n\n           \n\n        <span class="precio">${{plato.carga.precio}}</span><button ion-button (click)="ElegirPlato(plato.carga.nombre, cant.value,plato.carga.es, plato.carga.tiempo,  plato.carga.para,plato.carga.precio, plato.carga.id)">Elegir</button> <label class="platoCant">Cantidad</label>\n\n     \n\n        <!--input class="inpCantidad" [value]="valorPlatos"  #cant  placeholder="0" ion-input  type="number"-->\n\n        <input class="inpCantidad"  #cant  [value]="valorPlatos"   placeholder="0" ion-input type="number">\n\n      </div>\n\n        <div class="slide" [ngClass]="{\'mostrarSlide\':mostrarslide}">\n\n  \n\n          <ion-buttons end>\n\n            <button ion-button outline (click)="cerrarSlide()">\n\n              <ion-icon ios="ios-close" md="md-close" class="cerrarSlide" style="color:white"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n          <img [src]="foto" class="foto"  (swipe)="swipeLeftEvent($event)">\n\n            <h1 class="tituloslide">{{nombre}}</h1> \n\n            <h2 class="descSlide">{{desc}}</h2> \n\n         \n\n         </div>\n\n    </div>\n\n       <button ion-button class="aceptarBtn" color="dark" color="celeste" (click)="AceptarPedido()">Aceptar</button>\n\n       <button ion-button class="cancelarBtn" color="dark" color="celeste" (click)="CancelarPedido(\'plato\')">Cancelar</button>\n\n</div>\n\n<div class="platos" [ngClass]="{\'ocultar\':ocultarBebidas}">\n\n  <app-spinner *ngIf="mostrarSpinnerPlatos"></app-spinner>\n\n  <h1 class="tituloPlatos"  >{{titulo}}:</h1>\n\n\n\n  <div class="elPlato">\n\n    <div class="plato"  *ngFor="let plato of bebidas">\n\n    \n\n      <div class="elegido" [id]="plato.carga.id">\n\n       \n\n          <img  src="assets/imgs/beta/ok.png" id="img" >\n\n      </div>\n\n      <img [src]="plato.carga.foto1" class="platoImagen" (click)="mostrarSlide(plato.carga.foto1,plato.carga.foto2,plato.carga.foto3,plato.carga.nombre,plato.carga.desc)" ><h2>{{plato.carga.nombre}}</h2> \n\n      <span class="precio">${{plato.carga.precio}}</span><button ion-button (click)="ElegirPlato(plato.carga.nombre, cant.value,plato.carga.es, \'cero\',plato.carga.para, plato.carga.precio, plato.carga.id)">Elegir</button> <label class="platoCant">Cantidad</label>\n\n      <input class="inpCantidad"  #cant  [value]="valor" placeholder="0" ion-input type="number">\n\n \n\n    </div>\n\n    <div class="slide" [ngClass]="{\'mostrarSlide\':mostrarslide}">\n\n      <ion-buttons end>\n\n          <button ion-button outline (click)="cerrarSlide()">\n\n            <ion-icon ios="ios-close" md="md-close" class="cerrarSlide" style="color:white"></ion-icon>\n\n          </button>\n\n      </ion-buttons>\n\n      <img [src]="foto" class="foto" (swipe)="swipeLeftEvent($event)">\n\n      <h1 class="tituloslide">{{nombre}}</h1> \n\n      <h2 class="descSlide">{{desc}}</h2> \n\n       \n\n  </div>\n\n  </div>\n\n     <button ion-button class="aceptarBtn" color="dark" color="celeste" (click)="AceptarPedido()">Aceptar</button>\n\n     <button ion-button class="cancelarBtn" color="dark" color="celeste" (click)="CancelarPedido(\'bebida\')">Cancelar</button>\n\n</div>\n\n\n\n<ion-header>\n\n  <ion-navbar color="dark" hideBackButton="true">\n\n\n\n      <ion-buttons start style="left: 3px;\n\n      position: absolute;">\n\n        <button ion-button (click)="Atras()">\n\n          <ion-icon name="arrow-dropleft"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="monto" *ngIf="!ocultarMonto" [ngClass]="{\'animacion\':animacionMonto}">\n\n    <span class="elMonto" *ngIf="ocultarElMonto">MONTO: ${{monto}}</span>\n\n    <span class="elMontoEspera" *ngIf="mostrarSpinnerMonto">Cargando monto...  </span>\n\n \n\n    </div>\n\n    <div class="montoPrincipal" [ngClass]="{\'ocultarMontoPrincipal\':ocultarMontoPrincipal}">\n\n        <span class="elMonto">MONTO: ${{monto}}</span>\n\n       \n\n        </div>\n\n  <div class="contenido">\n\n      <h1 class="tituloPag" [ngClass]="{\'ocultarTit\':ocultarTitulo}">¡Haga su pedido!</h1>\n\n     \n\n      <div class="botonespp">\n\n            <button class="btnPlatos" (click)="Platos()" ion-button color="danger"  ><img src="assets/imgs/beta/comida.png"> Platos</button>\n\n            <button class="btnBebidas"  (click)="Bebidas()" ion-button color="danger" ><img src="assets/imgs/beta/bebidas.png">Bebidas</button>\n\n      </div>\n\n      <!--input class="inpDireccion" type="text" placeholder="Su direcci&oacute;n"-->\n\n      <button class="btnPedir" (click)="PedirFinal()" ion-button color="danger" >¡Pedir!</button>\n\n    </div>\n\n    <app-spinner *ngIf="mostrarSpinner"></app-spinner>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\pedir-platos\pedir-platos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], PedirPlatosPage);
    return PedirPlatosPage;
}());

//# sourceMappingURL=pedir-platos.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FcmProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__);
// fcm.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FcmProvider = /** @class */ (function () {
    function FcmProvider(firebaseNative, afs, platform) {
        this.firebaseNative = firebaseNative;
        this.afs = afs;
        this.platform = platform;
    }
    // Get permission from the user
    FcmProvider.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.platform.is('ios')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.firebaseNative.getToken()];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, this.firebaseNative.grantPermission()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, this.saveTokenToFirestore(token)];
                }
            });
        });
    };
    // Save the token to firestore
    FcmProvider.prototype.saveTokenToFirestore = function (token) {
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!token)
            return;
        var devicesRef = this.afs.collection('devices');
        var docData = {
            token: token,
            userId: 'testUser',
            //tipo: 'cliente'
            tipo: this.usuario.tipo,
            correo: this.usuario.correo
        };
        return devicesRef.doc(token).set(docData);
    };
    // Listen to incoming FCM messages
    FcmProvider.prototype.listenToNotifications = function () {
        return this.firebaseNative.onNotificationOpen();
    };
    FcmProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_firebase__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["AngularFirestore"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */]])
    ], FcmProvider);
    return FcmProvider;
}());

//# sourceMappingURL=fcm.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDuenioSupervisorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var AltaDuenioSupervisorPage = /** @class */ (function () {
    function AltaDuenioSupervisorPage(navCtrl, navParams, authInstance, toastCtrl, camera, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.firestore();
        this.tipo = "dueño";
        this.foto = "";
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
    AltaDuenioSupervisorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AltaDuenioSupervisorPage');
    };
    AltaDuenioSupervisorPage.prototype.ionViewDidLeave = function () { };
    AltaDuenioSupervisorPage.prototype.Registrar = function () {
        var _this = this;
        if (!this.correo || !this.clave || !this.nombre || !this.apellido || !this.dni || !this.cuil) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        if (!this.ValidarNumero(this.dni)) {
            this.presentToast("El DNI ingresado no es válido.");
            return;
        }
        if (!this.ValidarNumero(this.cuil)) {
            this.presentToast("El CUIL ingresado no es válido.");
            return;
        }
        if (this.foto == "") {
            this.presentToast("No te olvides de sacarte una foto.");
            return;
        }
        this.estadoBoton = true;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].dni == parseInt(_this.dni)) {
                    _this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
                    esValido = false;
                    _this.estadoBoton = false;
                    break;
                }
            }
            if (esValido) {
                var correo_1 = _this.correo.toLowerCase();
                _this.authInstance.auth.createUserWithEmailAndPassword(correo_1, _this.clave)
                    .then(function () {
                    var pictures = _this.firebase.storage().ref("usuarios/" + _this.nombreFoto);
                    pictures.putString(_this.foto, "data_url").then(function () {
                        pictures.getDownloadURL().then(function (url) {
                            usuariosRef.push({
                                nombre: _this.nombre,
                                apellido: _this.apellido,
                                correo: correo_1,
                                dni: parseInt(_this.dni),
                                cuil: parseInt(_this.cuil),
                                tipo: _this.tipo,
                                clave: _this.clave,
                                img: url
                            }).then(function () {
                                _this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", _this.LimpiarCampos);
                                _this.estadoBoton = false;
                            });
                        });
                    });
                })
                    .catch(function (error) {
                    var mensaje;
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            mensaje = "El correo ingresado no es válido.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/email-already-in-use":
                            mensaje = "Este usuario ya fue registrado previamente.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/weak-password":
                            mensaje = "La contraseña debe tener 6 o más caracteres.";
                            _this.estadoBoton = false;
                            break;
                        default:
                            mensaje = "Ups... Tenemos problemas técnicos.";
                            _this.estadoBoton = false;
                            break;
                    }
                    _this.presentToast(mensaje);
                });
            }
        });
    };
    AltaDuenioSupervisorPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, nombreFoto, options, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        this.foto = "data:image/jpeg;base64," + result;
                        this.nombreFoto = nombreFoto;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AltaDuenioSupervisorPage.prototype.InicializarLectorQR = function () {
        var _this = this;
        var options = { prompt: "Escaneá el DNI", formats: "PDF_417" };
        this.barcodeScanner.scan(options).then(function (barcodeData) {
            var dniDatos = barcodeData.text.split("@");
            _this.apellido = dniDatos[1];
            _this.nombre = dniDatos[2];
            _this.dni = dniDatos[4];
        }).catch(function (err) { });
    };
    AltaDuenioSupervisorPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    AltaDuenioSupervisorPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    AltaDuenioSupervisorPage.prototype.LimpiarCampos = function () {
        this.ocultarAlert = true;
        this.correo = undefined;
        this.clave = undefined;
        this.nombre = undefined;
        this.apellido = undefined;
        this.dni = undefined;
        this.cuil = undefined;
        this.tipo = "dueño";
        this.foto = "";
    };
    AltaDuenioSupervisorPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    AltaDuenioSupervisorPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    AltaDuenioSupervisorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-alta-duenio-supervisor',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-duenio-supervisor\alta-duenio-supervisor.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content [ngClass]="{\'ocultar-fondo\': estado == \'ocultar\'}">\n\n\n\n  <div class="vertical-container">\n\n\n\n    <img src="../../assets/imgs/alfa/logo.png">\n\n\n\n    <h1>Registro</h1>\n\n\n\n    <h2>Agregar un dueño o supervisor</h2>\n\n\n\n    <input type="text" placeholder="Correo electrónico" [(ngModel)]="correo" />\n\n    <input type="text" placeholder="Nombre" [(ngModel)]="nombre" />\n\n    <input type="text" placeholder="Apellido" [(ngModel)]="apellido" />\n\n\n\n    <div class="header" style="width: 75%;margin: 20px 0 20px 0;">\n\n      <input type="text" placeholder="DNI" style="margin: 0 15px 0 0; width: 50%" [(ngModel)]="dni" />\n\n      <input type="text" placeholder="CUIL" style="margin: 0;width: 50%" [(ngModel)]="cuil" />\n\n    </div>\n\n\n\n    <input type="password" placeholder="Contraseña" [(ngModel)]="clave" />\n\n\n\n    <select [(ngModel)]="tipo">\n\n      <option value="dueño">Dueño</option>\n\n      <option value="supervisor">Supervisor</option>\n\n    </select>\n\n\n\n    <img [src]="foto" alt="">\n\n\n\n    <div class="header" style="width: 75%;margin: 20px 0 20px 0;">\n\n      <button ion-button color="dark" class="alta" style="margin: 0 30px 0 0;width: 50%" (click)="SacarFoto()">Sacar\n\n        foto</button>\n\n      <button ion-button color="dark" class="alta" style="margin: 0;width: 50%" (click)="InicializarLectorQR()">QR</button>\n\n    </div>\n\n\n\n    <button ion-button color="dark" [disabled]="estadoBoton" class="alta" (click)="Registrar()">Registrar</button>\n\n  </div>\n\n\n\n  <button ion-button color="dark" class="close" (click)="OcultarLectorQR()">\n\n    <ion-icon name="close"></ion-icon>\n\n  </button>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':!estadoBoton}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-duenio-supervisor\alta-duenio-supervisor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], AltaDuenioSupervisorPage);
    return AltaDuenioSupervisorPage;
}());

//# sourceMappingURL=alta-duenio-supervisor.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaEmpleadoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var AltaEmpleadoPage = /** @class */ (function () {
    function AltaEmpleadoPage(navCtrl, navParams, authInstance, toastCtrl, camera, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.barcodeScanner = barcodeScanner;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.firestore();
        this.tipo = "mozo";
        this.foto = "";
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
    AltaEmpleadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AltaEmpleadoPage');
    };
    AltaEmpleadoPage.prototype.ionViewDidLeave = function () { };
    AltaEmpleadoPage.prototype.Registrar = function () {
        var _this = this;
        if (!this.correo || !this.clave || !this.nombre || !this.apellido || !this.dni || !this.cuil) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        if (!this.ValidarNumero(this.dni)) {
            this.presentToast("El DNI ingresado no es válido.");
            return;
        }
        if (!this.ValidarNumero(this.cuil)) {
            this.presentToast("El CUIL ingresado no es válido.");
            return;
        }
        this.estadoBoton = true;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].dni == parseInt(_this.dni)) {
                    _this.presentToast("El DNI ingresado ya corresponde a otro usuario registrado.");
                    esValido = false;
                    _this.estadoBoton = false;
                    break;
                }
            }
            if (esValido) {
                var correo_1 = _this.correo.toLowerCase();
                _this.authInstance.auth.createUserWithEmailAndPassword(correo_1, _this.clave)
                    .then(function () {
                    var url = "";
                    if (_this.foto == "") {
                        url = "../../assets/imgs/alfa/perfil.jpg";
                        usuariosRef.push({
                            nombre: _this.nombre,
                            apellido: _this.apellido,
                            correo: correo_1,
                            dni: parseInt(_this.dni),
                            cuil: parseInt(_this.cuil),
                            tipo: _this.tipo,
                            clave: _this.clave,
                            img: url,
                            "encuesta": {
                                "pregunta1": {
                                    "pesimo": 0,
                                    "malo": 0,
                                    "mediocre": 0,
                                    "bueno": 0,
                                    "excelente": 0
                                },
                                "pregunta2": {
                                    "si": 0,
                                    "no": 0
                                },
                                "pregunta3": {
                                    "item1": 0,
                                    "item2": 0,
                                    "item3": 0
                                },
                                "pregunta4": {
                                    "si": 0,
                                    "no": 0
                                },
                                "pregunta5": [0]
                            }
                        }).then(function () {
                            _this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", _this.LimpiarCampos);
                            _this.estadoBoton = false;
                        });
                    }
                    else {
                        var pictures_1 = _this.firebase.storage().ref("usuarios/" + _this.nombreFoto);
                        pictures_1.putString(_this.foto, "data_url").then(function () {
                            pictures_1.getDownloadURL().then(function (url) {
                                usuariosRef.push({
                                    nombre: _this.nombre,
                                    apellido: _this.apellido,
                                    correo: correo_1,
                                    dni: parseInt(_this.dni),
                                    cuil: parseInt(_this.cuil),
                                    tipo: _this.tipo,
                                    clave: _this.clave,
                                    img: url,
                                    "encuesta": {
                                        "pregunta1": {
                                            "pesimo": 0,
                                            "malo": 0,
                                            "mediocre": 0,
                                            "bueno": 0,
                                            "excelente": 0
                                        },
                                        "pregunta2": {
                                            "si": 0,
                                            "no": 0
                                        },
                                        "pregunta3": {
                                            "item1": 0,
                                            "item2": 0,
                                            "item3": 0
                                        },
                                        "pregunta4": {
                                            "si": 0,
                                            "no": 0
                                        },
                                        "pregunta5": [0]
                                    }
                                }).then(function () {
                                    _this.MostrarAlert("¡Éxito!", "Se registró correctamente el empleado.", "Aceptar", _this.LimpiarCampos);
                                    _this.estadoBoton = false;
                                });
                            });
                        });
                    }
                })
                    .catch(function (error) {
                    var mensaje;
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            mensaje = "El correo ingresado no es válido.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/email-already-in-use":
                            mensaje = "Este usuario ya fue registrado previamente.";
                            _this.estadoBoton = false;
                            break;
                        case "auth/weak-password":
                            mensaje = "La contraseña debe tener 6 o más caracteres.";
                            _this.estadoBoton = false;
                            break;
                        default:
                            mensaje = "Ups... Tenemos problemas técnicos.";
                            _this.estadoBoton = false;
                            break;
                    }
                    _this.presentToast(mensaje);
                });
            }
        });
    };
    AltaEmpleadoPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, nombreFoto, options, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        this.foto = "data:image/jpeg;base64," + result;
                        this.nombreFoto = nombreFoto;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AltaEmpleadoPage.prototype.InicializarLectorQR = function () {
        var _this = this;
        var options = { prompt: "Escaneá el DNI", formats: "PDF_417" };
        this.barcodeScanner.scan(options).then(function (barcodeData) {
            var dniDatos = barcodeData.text.split("@");
            _this.apellido = dniDatos[1];
            _this.nombre = dniDatos[2];
            _this.dni = dniDatos[4];
        }).catch(function (err) { });
    };
    AltaEmpleadoPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    AltaEmpleadoPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    AltaEmpleadoPage.prototype.LimpiarCampos = function () {
        this.ocultarAlert = true;
        this.correo = undefined;
        this.clave = undefined;
        this.nombre = undefined;
        this.apellido = undefined;
        this.dni = undefined;
        this.cuil = undefined;
        this.tipo = "mozo";
        this.foto = "";
    };
    AltaEmpleadoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    AltaEmpleadoPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    AltaEmpleadoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-alta-empleado',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-empleado\alta-empleado.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content [ngClass]="{\'ocultar-fondo\': estado == \'ocultar\'}">\n\n\n\n  <div class="vertical-container">\n\n\n\n    <img src="../../assets/imgs/alfa/logo.png">\n\n\n\n    <h1>Registro</h1>\n\n\n\n    <h2>Agregar un empleado</h2>\n\n\n\n    <input type="text" placeholder="Correo electrónico" [(ngModel)]="correo" />\n\n    <input type="text" placeholder="Nombre" [(ngModel)]="nombre" />\n\n    <input type="text" placeholder="Apellido" [(ngModel)]="apellido" />\n\n\n\n    <div class="header" style="width: 75%;margin: 20px 0 20px 0;">\n\n      <input type="text" placeholder="DNI" style="margin: 0 15px 0 0; width: 50%" [(ngModel)]="dni" />\n\n      <input type="text" placeholder="CUIL" style="margin: 0;width: 50%" [(ngModel)]="cuil" />\n\n    </div>\n\n\n\n    <input type="password" placeholder="Contraseña" [(ngModel)]="clave" />\n\n\n\n    <select [(ngModel)]="tipo">\n\n      <option value="mozo">Mozo</option>\n\n      <option value="cocinero">Cocinero</option>\n\n      <option value="bartender">Bartender</option>\n\n      <option value="metre">Metre</option>\n\n      <option value="repartidor">Repartidor</option>\n\n    </select>\n\n\n\n    <img [src]="foto" alt="">\n\n\n\n    <div class="header" style="width: 75%;margin: 20px 0 20px 0;">\n\n      <button ion-button color="dark" class="alta" style="margin: 0 30px 0 0;width: 50%" (click)="SacarFoto()">Sacar\n\n        foto</button>\n\n      <button ion-button color="dark" class="alta" style="margin: 0;width: 50%" (click)="InicializarLectorQR()">QR</button>\n\n\n\n    </div>\n\n\n\n    <button ion-button color="dark" [disabled]="estadoBoton" class="alta" (click)="Registrar()">Registrar</button>\n\n  </div>\n\n\n\n  <button ion-button color="dark" class="close" (click)="OcultarLectorQR()">\n\n    <ion-icon name="close"></ion-icon>\n\n  </button>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':!estadoBoton}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-empleado\alta-empleado.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], AltaEmpleadoPage);
    return AltaEmpleadoPage;
}());

//# sourceMappingURL=alta-empleado.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadoSupervisorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__encuesta_supervisor_encuesta_supervisor__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListadoSupervisorPage = /** @class */ (function () {
    function ListadoSupervisorPage(navCtrl, navParams, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.image = "";
        this.ocultarImagen = true;
        this.ocultarSpinner = false;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        // =========== Axel ===========
        this.pieChartType = 'pie';
        this.pregUnoPrimeraRespuesta = 0;
        this.pregUnoSegundaRespuesta = 0;
        this.pregUnoTerceraRespuesta = 0;
        this.pregTresPrimeraRespuesta = 0;
        this.pregTresSegundaRespuesta = 0;
        this.pregCuatroPrimeraRespuesta = 0;
        this.pregCuatroSegundaRespuesta = 0;
        this.pregCincoPrimeraRespuesta = 0;
        this.pregCincoSegundaRespuesta = 0;
        // ============================
        // =========== Facu ===========
        this.pregunta4Labels = ['Horribles', 'Feos', 'Pasable', 'Aceptable', 'Buenos', 'Ricos', 'Muy ricos'];
        this.pregunta4Data = [0, 0, 0, 0, 0, 0, 0];
        this.pregunta1Labels = ['Sí', 'No'];
        this.pregunta1Data = [0, 0];
        this.pregunta2Labels = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'];
        this.pregunta2Data = [0, 0, 0, 0, 0];
        this.pregunta3Labels = ['Comodidad', 'Platos', 'Precios', 'No tienen'];
        this.pregunta3Data = [0, 0, 0, 0];
        this.pregunta5Labels = ['Puntuaron 1', ' Puntuaron 2', ' Puntuaron 3', 'Puntuaron 4', 'Puntuaron 5', 'Puntuaron 6', 'Puntuaron 7', 'Puntuaron 8', 'Puntuaron 9', 'Puntuaron 10'];
        this.pregunta5Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.doughnutChartType = 'doughnut';
        this.votosPreg1Si = 0;
        this.votosPreg1No = 0;
        this.votosHorribles = 0;
        this.votosFeos = 0;
        this.votosPasable = 0;
        this.votosAceptable = 0;
        this.votosBuenos = 0;
        this.votosRicos = 0;
        this.votosMuyRicos = 0;
        this.votos1 = 0;
        this.votos2 = 0;
        this.votos3 = 0;
        this.votos4 = 0;
        this.votos5 = 0;
        this.votos6 = 0;
        this.votos7 = 0;
        this.votos8 = 0;
        this.votos9 = 0;
        this.votos10 = 0;
        this.votosComodidad = 0;
        this.votosAtencion = 0;
        this.votoPrecios = 0;
        this.votosPlatos = 0;
        this.votosMuyMala = 0;
        this.votosMala = 0;
        this.votosRegular = 0;
        this.votosBuena = 0;
        this.votosMuyBuena = 0;
        this.resp3comodidad = false;
        this.resp3platos = false;
        this.resp3precios = false;
        this.resp3atencion = false;
        __WEBPACK_IMPORTED_MODULE_6_chart_js__["Chart"].defaults.global.legend.display = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.usuarios = [];
        this.empleados = [];
        this.usuarios = [];
        this.vistas = [true, false, false];
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                _this.usuarios.push(data[item]);
            }
        }).then(function () {
            _this.empleados = _this.usuarios.filter(function (item) {
                return item.tipo == "mozo" || item.tipo == "cocinero" || item.tipo == "bartender" || item.tipo == "metre" || item.tipo == "repartidor";
            });
            _this.clientes = _this.usuarios.filter(function (item) {
                return item.tipo == "cliente" || item.tipo == "anonimo";
            });
            _this.encuesta();
        });
    }
    // ============================
    ListadoSupervisorPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ListadoSupervisorPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ListadoSupervisorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListadoSupervisorPage');
    };
    ListadoSupervisorPage.prototype.AlternarVista = function (indice) {
        this.vistas = [false, false, false];
        this.vistas[indice] = true;
    };
    ListadoSupervisorPage.prototype.MostrarEncuesta = function (usuario) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__encuesta_supervisor_encuesta_supervisor__["a" /* EncuestaSupervisorPage */], { usuario: usuario }).present();
    };
    ListadoSupervisorPage.prototype.encuesta = function () {
        var _this = this;
        var probRef = this.firebase.database().ref("encuestaDeEmpleado");
        probRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].uno == 1) {
                    _this.pregUnoPrimeraRespuesta++;
                }
                if (data[item].uno == 2) {
                    _this.pregUnoSegundaRespuesta++;
                }
                if (data[item].uno == 3) {
                    _this.pregUnoTerceraRespuesta++;
                }
                if (data[item].tres == "si") {
                    _this.pregTresPrimeraRespuesta++;
                }
                if (data[item].tres == "no") {
                    _this.pregTresSegundaRespuesta++;
                }
                if (data[item].cuatro == "si") {
                    _this.pregCuatroPrimeraRespuesta++;
                }
                if (data[item].cuatro == "no") {
                    _this.pregCuatroSegundaRespuesta++;
                }
                if (data[item].cinco.item1 == true) {
                    _this.pregCincoPrimeraRespuesta++;
                }
                if (data[item].cinco.item2 == true) {
                    _this.pregCincoSegundaRespuesta++;
                }
            }
        }).then(function () {
            _this.pieChartLabels = ['Sí', 'No'];
            _this.pieChartData = [_this.pregTresPrimeraRespuesta, _this.pregTresSegundaRespuesta];
            _this.pieChartLabelsDos = ['Sí', 'No'];
            //this.pieChartDataDos = [this.pregCuatroPrimeraRespuesta, this.pregCuatroPrimeraRespuesta];
            _this.pieChartDataDos = [_this.pregCuatroPrimeraRespuesta, _this.pregCuatroSegundaRespuesta];
            _this.pieChartLabelsCinco = ['Sí', 'No'];
            _this.pieChartDataCinco = [_this.pregCincoPrimeraRespuesta, _this.pregCincoSegundaRespuesta];
            _this.pieChartLabelsUno = ["Bien", "Más o menos", "Mal"];
            //this.pieChartDataUno = [this.pregUnoPrimeraRespuesta, this.pregUnoSegundaRespuesta, this.pregUnoTerceraRespuesta];
            _this.pieChartDataUno = [_this.pregUnoTerceraRespuesta, _this.pregUnoSegundaRespuesta, _this.pregUnoPrimeraRespuesta];
            _this.EncuestaFacu();
        });
    };
    ListadoSupervisorPage.prototype.EncuestaFacu = function () {
        var _this = this;
        var encuestaRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("encuestaCliente/");
        encuestaRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                //Cargo los puntos para la pregunta 4.
                console.log(data[item].preg4);
                if (data[item].preg4 == 1) {
                    _this.votosHorribles++;
                }
                if (data[item].preg4 == 2) {
                    _this.votosFeos++;
                }
                if (data[item].preg4 == 3) {
                    _this.votosPasable++;
                }
                if (data[item].preg4 == 4) {
                    _this.votosAceptable++;
                }
                if (data[item].preg4 == 5) {
                    _this.votosBuenos++;
                }
                if (data[item].preg4 == 6) {
                    _this.votosRicos++;
                }
                if (data[item].preg4 == 7) {
                    _this.votosMuyRicos++;
                }
                //Cargo los puntos para pregunta 1
                if (data[item].preg1 == "Si") {
                    _this.votosPreg1Si++;
                }
                else {
                    _this.votosPreg1No++;
                }
                //Cargo los puntos para pregunta 2
                if (data[item].preg2 == "muy mala") {
                    _this.votosMuyMala++;
                }
                if (data[item].preg2 == "mala") {
                    _this.votosMala++;
                }
                if (data[item].preg2 == "muy buena") {
                    _this.votosMuyBuena++;
                }
                if (data[item].preg2 == "buena") {
                    _this.votosBuena++;
                }
                if (data[item].preg2 == "regular") {
                    _this.votosRegular++;
                }
                //Valido pregunta 3
                var resp3 = data[item].preg3.split("-");
                if (resp3[0] == "true") {
                    _this.votosComodidad++;
                }
                if (resp3[1] == "true") {
                    _this.votosPlatos++;
                }
                if (resp3[2] == "true") {
                    _this.votoPrecios++;
                }
                if (resp3[3] == "true") {
                    _this.votosAtencion++;
                }
                //Valido pregunta 5
                if (data[item].preg5 == "1") {
                    _this.votos1++;
                }
                if (data[item].preg5 == "2") {
                    _this.votos2++;
                }
                if (data[item].preg5 == "3") {
                    _this.votos3++;
                }
                if (data[item].preg5 == "4") {
                    _this.votos4++;
                }
                if (data[item].preg5 == "5") {
                    _this.votos5++;
                }
                if (data[item].preg5 == "6") {
                    _this.votos6++;
                }
                if (data[item].preg5 == "7") {
                    _this.votos7++;
                }
                if (data[item].preg5 == "8") {
                    _this.votos8++;
                }
                if (data[item].preg5 == "9") {
                    _this.votos9++;
                }
                if (data[item].preg5 == "10") {
                    _this.votos10++;
                }
            }
            _this.pregunta4Data = [
                _this.votosHorribles,
                _this.votosFeos,
                _this.votosPasable,
                _this.votosAceptable,
                _this.votosBuenos,
                _this.votosRicos,
                _this.votosMuyRicos
            ];
            _this.pregunta5Data = [
                _this.votos1,
                _this.votos2,
                _this.votos3,
                _this.votos4,
                _this.votos5,
                _this.votos6,
                _this.votos7,
                _this.votos8,
                _this.votos9,
                _this.votos10,
            ];
            _this.pregunta1Data = [
                _this.votosPreg1Si,
                _this.votosPreg1No
            ];
            _this.pregunta2Data = [
                _this.votosMuyMala,
                _this.votosMala,
                _this.votosRegular,
                _this.votosBuena,
                _this.votosMuyBuena
            ];
            _this.pregunta3Data = [
                _this.votosComodidad,
                _this.votosPlatos,
                _this.votoPrecios,
                _this.votosAtencion
            ];
        }).then(function () {
            _this.ocultarSpinner = true;
        });
    };
    ListadoSupervisorPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    ListadoSupervisorPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    ListadoSupervisorPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    ListadoSupervisorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-listado-supervisor',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\listado-supervisor\listado-supervisor.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div class="imagen" [ngClass]="{\'ocultar\':ocultarImagen,\'opacidad\':true}">\n\n\n\n  <ion-icon name="close" (click)="OcultarImagen()"></ion-icon>\n\n  <img [src]="image" alt="">\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <div class="seleccion" *ngIf="ocultarSpinner">\n\n\n\n    <button ion-button color="dark" (click)="AlternarVista(0)">Supervisor</button>\n\n    <button ion-button color="dark" (click)="AlternarVista(1)">Clientes</button>\n\n    <button ion-button color="dark" (click)="AlternarVista(2)">Empleados</button>\n\n\n\n  </div>\n\n\n\n  <ng-container *ngIf="vistas[0]">\n\n\n\n    <ng-container *ngIf="ocultarSpinner">\n\n      <h2 class="titulo">Empleados</h2>\n\n    </ng-container>\n\n\n\n    <ion-list>\n\n\n\n      <ion-item *ngFor="let item of empleados">\n\n        <ion-thumbnail item-start (click)="MostrarImagen(item.img)">\n\n          <img src={{item.img}}>\n\n        </ion-thumbnail>\n\n\n\n        <h1>{{item.apellido}}, {{item.nombre}}</h1>\n\n        <p>Empleado • {{item.tipo}}</p>\n\n        <p>CUIL • {{item.cuil}}</p>\n\n\n\n        <button ion-button clear item-end (click)="MostrarEncuesta(item)">\n\n          <ion-icon name="clipboard"></ion-icon>\n\n        </button>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <ng-container *ngIf="ocultarSpinner">\n\n      <h2 class="titulo">Clientes</h2>\n\n    </ng-container>\n\n\n\n    <ion-list>\n\n\n\n      <ion-item *ngFor="let item of clientes">\n\n\n\n        <ion-thumbnail item-start (click)="MostrarImagen(item.img)">\n\n          <img src={{item.img}} />\n\n        </ion-thumbnail>\n\n\n\n        <h1>{{item.apellido}}, {{item.nombre}}</h1>\n\n        <p>{{item.tipo}}</p>\n\n        <p>DNI • {{item.dni}}</p>\n\n\n\n        <button ion-button clear item-end (click)="MostrarEncuesta(item)">\n\n          <ion-icon name="clipboard"></ion-icon>\n\n        </button>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n  </ng-container>\n\n\n\n  <ng-container *ngIf="vistas[1]">\n\n\n\n    <h2 class="titulo">Pregunta 1, ¿Se siente cómodo en el restaurante?</h2>\n\n\n\n    <canvas class="altoCanvas" baseChart [data]="pregunta1Data" [labels]="pregunta1Labels" [chartType]="doughnutChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 2, ¿Cómo calificaría la atención?</h2>\n\n\n\n    <canvas class="altoCanvas" baseChart [data]="pregunta2Data" [labels]="pregunta2Labels" [chartType]="doughnutChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 3, ¿Cuáles considera nuestros puntos fuertes?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pregunta3Data" [labels]="pregunta3Labels" [chartType]="doughnutChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 4, ¿Qué tan buenos son nuestros platos?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pregunta4Data" [labels]="pregunta4Labels" [chartType]="doughnutChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 5, Del 1 al 10 ¿Qué puntaje le pondrías a nuestro restaurante?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pregunta5Data" [labels]="pregunta5Labels" [chartType]="doughnutChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n  </ng-container>\n\n\n\n  <ng-container *ngIf="vistas[2]">\n\n\n\n    <h2 class="titulo">Pregunta 1, ¿Cuán limpio es el lugar?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pieChartDataUno" [labels]="pieChartLabelsUno" [chartType]="pieChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 3, ¿Le tratan bien sus jefes?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pieChartData" [labels]="pieChartLabels" [chartType]="pieChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 4, ¿Le pagan bien?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pieChartDataDos" [labels]="pieChartLabelsDos" [chartType]="pieChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n    <h2 class="titulo">Pregunta 5, ¿Dejaría de trabajar acá?</h2>\n\n\n\n    <canvas baseChart class="altoCanvas" [data]="pieChartDataCinco" [labels]="pieChartLabelsCinco" [chartType]="pieChartType"\n\n      (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>\n\n\n\n  </ng-container>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\listado-supervisor\listado-supervisor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], ListadoSupervisorPage);
    return ListadoSupervisorPage;
}());

//# sourceMappingURL=listado-supervisor.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncuestaSupervisorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EncuestaSupervisorPage = /** @class */ (function () {
    function EncuestaSupervisorPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.pregunta1Labels = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
        this.pregunta1Data = [0, 0, 0, 0, 0];
        this.pregunta2Labels = ['Sí', 'No'];
        this.pregunta2Data = [0, 0];
        this.pregunta3Labels = ['Mala conducta', 'Mala presentación', 'Poca formalidad'];
        this.pregunta3Data = [0, 0, 0];
        this.pregunta4Labels = ['Sí', 'No'];
        this.pregunta4Data = [0, 0];
        this.pregunta5 = [];
        this.doughnutChartType = 'doughnut';
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.moment = __WEBPACK_IMPORTED_MODULE_3_moment__;
        this.conducta = 3;
        this.textoRange = "Mediocre";
        this.inconveniente = "0";
        this.aspectos = { item1: false, item2: false, item3: false };
        this.prescencia = "1";
        this.image = "";
        this.ocultarImagen = true;
        __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"].defaults.global.legend.display = false;
        this.usuario = navParams.get("usuario");
        this.usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.estadoBoton = true;
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.pregunta1Data = [
                        data[item].encuesta.pregunta1.pesimo,
                        data[item].encuesta.pregunta1.malo,
                        data[item].encuesta.pregunta1.mediocre,
                        data[item].encuesta.pregunta1.bueno,
                        data[item].encuesta.pregunta1.excelente
                    ];
                    _this.pregunta2Data = [
                        data[item].encuesta.pregunta2.si,
                        data[item].encuesta.pregunta2.no
                    ];
                    _this.pregunta3Data = [
                        data[item].encuesta.pregunta3.item1,
                        data[item].encuesta.pregunta3.item2,
                        data[item].encuesta.pregunta3.item3
                    ];
                    _this.pregunta4Data = [
                        data[item].encuesta.pregunta4.si,
                        data[item].encuesta.pregunta4.no
                    ];
                    _this.pregunta5 = data[item].encuesta.pregunta5;
                    _this.pregunta5.splice(0, 1);
                    _this.pregunta5 = _this.pregunta5.reverse();
                    break;
                }
            }
            _this.estadoBoton = false;
        });
    }
    // events
    EncuestaSupervisorPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaSupervisorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaSupervisorPage');
    };
    EncuestaSupervisorPage.prototype.ModificarTextoRange = function () {
        var arrayAux = ['Pésimo', 'Malo', 'Mediocre', 'Bueno', 'Excelente'];
        this.textoRange = arrayAux[this.conducta - 1];
    };
    EncuestaSupervisorPage.prototype.HacerEncuesta = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.estadoBoton = true;
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    console.clear();
                    var pregunta1 = [data[item].encuesta.pregunta1.pesimo, data[item].encuesta.pregunta1.malo, data[item].encuesta.pregunta1.mediocre, data[item].encuesta.pregunta1.bueno, data[item].encuesta.pregunta1.excelente];
                    pregunta1[_this.conducta - 1]++;
                    var pregunta2 = [data[item].encuesta.pregunta2.no, data[item].encuesta.pregunta2.si];
                    pregunta2[_this.inconveniente]++;
                    var pregunta3 = [];
                    pregunta3[0] = (_this.aspectos.item1) ? data[item].encuesta.pregunta3.item1 + 1 : data[item].encuesta.pregunta3.item1;
                    pregunta3[1] = (_this.aspectos.item2) ? data[item].encuesta.pregunta3.item2 + 1 : data[item].encuesta.pregunta3.item2;
                    pregunta3[2] = (_this.aspectos.item3) ? data[item].encuesta.pregunta3.item3 + 1 : data[item].encuesta.pregunta3.item3;
                    var pregunta4 = [data[item].encuesta.pregunta4.no, data[item].encuesta.pregunta4.si];
                    pregunta4[_this.prescencia]++;
                    var pregunta5 = data[item].encuesta.pregunta5;
                    if (_this.opinion) {
                        var momentoActual = __WEBPACK_IMPORTED_MODULE_3_moment__(new Date());
                        pregunta5.push({ nombre: _this.usuarioLogueado.apellido + ", " + _this.usuarioLogueado.nombre, fecha: momentoActual.format("DD/MM/YYYY HH:mm"), comentario: _this.opinion, img: _this.usuarioLogueado.img });
                    }
                    usuariosRef.child(item).update({
                        "encuesta": {
                            "pregunta1": {
                                "pesimo": pregunta1[0],
                                "malo": pregunta1[1],
                                "mediocre": pregunta1[2],
                                "bueno": pregunta1[3],
                                "excelente": pregunta1[4]
                            },
                            "pregunta2": {
                                "si": pregunta2[0],
                                "no": pregunta2[1]
                            },
                            "pregunta3": {
                                "item1": pregunta3[0],
                                "item2": pregunta3[1],
                                "item3": pregunta3[2]
                            },
                            "pregunta4": {
                                "si": pregunta4[0],
                                "no": pregunta4[1]
                            },
                            "pregunta5": pregunta5
                        }
                    }).then(function () {
                        _this.estadoBoton = false;
                        _this.presentToast("Se ha cargado correctamente la encuesta.");
                        // this.navCtrl.pop();
                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                    break;
                }
            }
        });
    };
    EncuestaSupervisorPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    EncuestaSupervisorPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    EncuestaSupervisorPage.prototype.VolverAtras = function () {
        this.navCtrl.pop();
    };
    EncuestaSupervisorPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    EncuestaSupervisorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-encuesta-supervisor',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-supervisor\encuesta-supervisor.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons>\n\n      <button ion-button (click)="VolverAtras()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div class="imagen" [ngClass]="{\'ocultar\':ocultarImagen,\'opacidad\':true}">\n\n\n\n  <ion-icon name="close" (click)="OcultarImagen()"></ion-icon>\n\n  <img [src]="image" alt="">\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <h1>Califique la conducta de {{usuario.apellido}}, {{usuario.nombre}}.</h1>\n\n\n\n  <div class="encuesta">\n\n    <div id="divCanvas" class="canvas">\n\n      <canvas baseChart [data]="pregunta1Data" [labels]="pregunta1Labels" [chartType]="doughnutChartType" (chartHover)="chartHovered($event)"\n\n        (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n    <div class="mi-range">\n\n\n\n      <ion-range [(ngModel)]="conducta" color="dark" pin="true" min="1" max="5" snaps="true" style="width: 100%;position: relative;"\n\n        (ngModelChange)="ModificarTextoRange()"></ion-range>\n\n      <span>{{textoRange}}</span>\n\n\n\n    </div>\n\n  </div>\n\n\n\n  <h1>¿Tuvo algún inconveniente con {{usuario.apellido}}, {{usuario.nombre}} en horas de servicio?</h1>\n\n\n\n  <div class="encuesta">\n\n\n\n    <div id="divCanvas" class="canvas">\n\n\n\n      <canvas baseChart [data]="pregunta2Data" [labels]="pregunta2Labels" [chartType]="doughnutChartType" (chartHover)="chartHovered($event)"\n\n        (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n    <ion-list radio-group [(ngModel)]="inconveniente">\n\n      <ion-item>\n\n        <ion-label>Sí</ion-label>\n\n        <ion-radio color="dark" value="1"></ion-radio>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>No</ion-label>\n\n        <ion-radio color="dark" value="0"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n  </div>\n\n\n\n  <h1>Seleccione el/los aspectos a tener en cuenta de {{usuario.apellido}}, {{usuario.nombre}}.</h1>\n\n\n\n  <div class="encuesta">\n\n\n\n    <div id="divCanvas" class="canvas">\n\n      <canvas baseChart [data]="pregunta3Data" [labels]="pregunta3Labels" [chartType]="doughnutChartType" (chartHover)="chartHovered($event)"\n\n        (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n    <ion-list style="left: -75px;">\n\n\n\n      <ion-item>\n\n        <ion-label>Mala conducta</ion-label>\n\n        <ion-checkbox color="dark" [(ngModel)]="aspectos.item1"></ion-checkbox>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Mala presentación</ion-label>\n\n        <ion-checkbox color="dark" [(ngModel)]="aspectos.item2"></ion-checkbox>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Poca formalidad</ion-label>\n\n        <ion-checkbox color="dark" [(ngModel)]="aspectos.item3"></ion-checkbox>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n\n\n  </div>\n\n\n\n  <h1>¿Le gustaría que {{usuario.apellido}}, {{usuario.nombre}} siguiese presentandose en el restaurante?</h1>\n\n\n\n  <div class="encuesta">\n\n\n\n    <div id="divCanvas" class="canvas">\n\n      <canvas baseChart [data]="pregunta4Data" [labels]="pregunta4Labels" [chartType]="doughnutChartType" (chartHover)="chartHovered($event)"\n\n        (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n    <select [(ngModel)]="prescencia">\n\n      <option value="1">Sí, definitivamente.</option>\n\n      <option value="0">No, en absoluto.</option>\n\n    </select>\n\n\n\n  </div>\n\n\n\n  <h1>Escriba su comentario.</h1>\n\n\n\n  <div class="encuesta">\n\n\n\n    <textarea rows="4" cols="50" placeholder="Escribe tu comentario aquí..." [(ngModel)]="opinion"></textarea>\n\n\n\n  </div>\n\n\n\n  <button ion-button color="dark" class="enviar" [disabled]="estadoBoton" (click)="HacerEncuesta()">Enviar encuesta</button>\n\n\n\n  <h1 style="margin-bottom: 30px;" *ngIf="!ocultarSpinner && pregunta5.length > 1">Comentarios</h1>\n\n\n\n    <div class="comentarios" *ngFor="let item of pregunta5">\n\n\n\n      <img src="{{item.img}}" (click)="MostrarImagen(item.img)" />\n\n      <h2>{{item.nombre}}</h2>\n\n      <h5>({{item.fecha}} Hs.)</h5>\n\n      <p>{{item.comentario}}</p>\n\n\n\n    </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':!estadoBoton}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-supervisor\encuesta-supervisor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], EncuestaSupervisorPage);
    return EncuestaSupervisorPage;
}());

//# sourceMappingURL=encuesta-supervisor.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_mis_reservas_mis_reservas__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReservaPage = /** @class */ (function () {
    function ReservaPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.moment = __WEBPACK_IMPORTED_MODULE_5_moment__;
        this.ocultarSpinner = true;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        console.clear();
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.nombreDeLosMeses = "Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic";
        var date = new Date();
        var mes = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
        var dia = (date.getDate() < 10 ? '0' : '') + date.getDate();
        this.minimo = date.getFullYear() + "-" + mes + "-" + dia;
        this.maximo = "" + (date.getFullYear() + 1);
    }
    ReservaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservaPage');
    };
    ReservaPage.prototype.Reservar = function () {
        var _this = this;
        if (!this.fecha || !this.hora || !this.cantidadPersonas) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        var fechaAux = this.fecha.split("-");
        var horaAux = this.hora.split(":");
        var momentoReserva = __WEBPACK_IMPORTED_MODULE_5_moment__(new Date(fechaAux[0], fechaAux[1] - 1, fechaAux[2], horaAux[0], horaAux[1]));
        var momentoActual = __WEBPACK_IMPORTED_MODULE_5_moment__(new Date());
        // if (Math.abs(momentoReserva.diff(momentoActual, "m")) < 60) {
        //   this.presentToast("No se puede realizar una reserva con menos de una hora de adelanto.");
        //   return;
        // }
        if (momentoReserva.diff(momentoActual, "m") < 5) {
            this.presentToast("No se puede realizar una reserva con menos de 5 minutos de adelanto.");
            return;
        }
        this.ocultarSpinner = false;
        this.estadoBoton = true;
        var reservasRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("reservas");
        var personasQueVan = parseInt(this.cantidadPersonas.charAt(3));
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    var diferencia = Math.abs(momentoReserva.diff(__WEBPACK_IMPORTED_MODULE_5_moment__(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 60) {
                        _this.ocultarSpinner = true;
                        _this.estadoBoton = false;
                        _this.presentToast("No puede haber un lapso menor a una hora entre alguna de tus reservas.");
                        esValido = false;
                        break;
                    }
                }
            }
            if (esValido) {
                reservasRef.once("value", function (snap) {
                    var data = snap.val();
                    var reservas = [];
                    var contador = 0;
                    for (var item in data) {
                        reservas.push(data[item]);
                        reservas[contador].key = item;
                        contador++;
                    }
                    _this.reservasConfirmadas = reservas.filter(function (item) {
                        return item.estado == "confirmada";
                    });
                }).then(function () {
                    var mesasRef = _this.firebase.database().ref("mesas");
                    var puedeReservar = false;
                    mesasRef.once("value", function (snap) {
                        var data = snap.val();
                        var estaDesocupada;
                        for (var item in data) {
                            estaDesocupada = true;
                            for (var _i = 0, _a = _this.reservasConfirmadas; _i < _a.length; _i++) {
                                var reserva = _a[_i];
                                if (data[item].numeroMesa == reserva.mesa) {
                                    var momentoReservaMesa = __WEBPACK_IMPORTED_MODULE_5_moment__(reserva.horario, "DD/MM/YYYY HH:mm");
                                    if (Math.abs(momentoReserva.diff(momentoReservaMesa, "m")) < 40) {
                                        estaDesocupada = false;
                                        break;
                                    }
                                }
                            }
                            if (data[item].cantidadComensales >= personasQueVan && estaDesocupada) {
                                console.log(data[item].cantidadComensales >= personasQueVan);
                                puedeReservar = true;
                                break;
                            }
                        }
                        if (puedeReservar) {
                            reservasRef.push({
                                correo: _this.usuario.correo,
                                apellido: _this.usuario.apellido,
                                nombre: _this.usuario.nombre,
                                img: _this.usuario.img,
                                cantidadPersonas: personasQueVan,
                                horario: momentoReserva.format("DD/MM/YYYY HH:mm"),
                                estado: "pendiente"
                            }).then(function () {
                                _this.ocultarSpinner = true;
                                _this.estadoBoton = false;
                                _this.MostrarAlert("¡Éxito!", "Se registró tu reserva y te notificaremos cuando el encargado la confirme.", "Aceptar", _this.Volver);
                            });
                        }
                        else {
                            _this.ocultarSpinner = true;
                            _this.estadoBoton = false;
                            _this.MostrarAlert("Ups...", "No hay mesas disponibles para esa fecha y horario.", "Aceptar", _this.OcultarAlert);
                        }
                    });
                });
            }
        });
    };
    ReservaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: 'top',
            duration: 3000,
            cssClass: "infoToast"
        });
        toast.present();
    };
    ReservaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    ReservaPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    ReservaPage.prototype.VerReservas = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_mis_reservas_mis_reservas__["a" /* MisReservasPage */]);
    };
    ReservaPage.prototype.Volver = function () {
        this.navCtrl.pop();
    };
    ReservaPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    ReservaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reserva',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\reserva\reserva.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="VerReservas()">\n\n        <ion-icon name="calendar"></ion-icon>\n\n      </button>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <div class="horizontal-container">\n\n\n\n    <div class="vertical-container">\n\n\n\n      <h1>Reservar</h1>\n\n\n\n      <ion-item>\n\n        <ion-label>Fecha</ion-label>\n\n        <ion-datetime displayFormat="DD/MMM/YYYY" monthShortNames={{nombreDeLosMeses}} min={{minimo}} max={{maximo}}\n\n          cancelText="Cancelar" doneText="Aceptar" [(ngModel)]="fecha">\n\n        </ion-datetime>\n\n      </ion-item>\n\n\n\n      <ion-item style="width: 50px;">\n\n        <ion-label>Hora</ion-label>\n\n        <ion-datetime displayFormat="HH:mm" cancelText="Cancelar" doneText="Aceptar" [(ngModel)]="hora"></ion-datetime>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Personas</ion-label>\n\n        <ion-datetime displayFormat="YY" min="2001" max="2008" cancelText="Cancelar" doneText="Aceptar" [(ngModel)]="cantidadPersonas">\n\n        </ion-datetime>\n\n      </ion-item>\n\n\n\n      <button ion-button outline color="light" class="alta" [disabled]="estadoBoton" (click)="Reservar()">Reservar</button>\n\n    </div>\n\n\n\n  </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\reserva\reserva.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ReservaPage);
    return ReservaPage;
}());

//# sourceMappingURL=reserva.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisReservasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MisReservasPage = /** @class */ (function () {
    function MisReservasPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.ocultarSpinner = false;
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.reservas = [];
        this.reservasPendientes = [];
        this.reservasConfirmadas = [];
        this.ejecutarSetInterval = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        setInterval(function () {
            _this.reservasPendientes = _this.reservasPendientes;
            _this.reservasConfirmadas = _this.reservasConfirmadas;
        }, 500);
        var reservasRef = this.firebase.database().ref("reservas");
        reservasRef.on("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var contador = 0;
            for (var item in data) {
                _this.reservas.push(data[item]);
                _this.reservas[contador].key = item;
                contador++;
            }
            _this.reservas = _this.reservas.filter(function (item) {
                return _this.usuario.correo == item.correo;
            });
            _this.reservasPendientes = _this.reservas.filter(function (item) {
                return item.estado == "pendiente";
            });
            _this.reservasConfirmadas = _this.reservas.filter(function (item) {
                return item.estado == "confirmada";
            });
            if (_this.ejecutarSetInterval) {
                _this.VerificarReservasPasadasDeTiempo();
                _this.ejecutarSetInterval = false;
                setInterval(function () {
                    _this.VerificarReservasPasadasDeTiempo();
                }, 1000 * 60);
            }
            _this.ocultarSpinner = true;
        });
    }
    MisReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisReservasPage');
    };
    MisReservasPage.prototype.VerificarReservasPasadasDeTiempo = function () {
        var _this = this;
        var momentoActual = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date());
        for (var _i = 0, _a = this.reservas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (momentoActual.diff(__WEBPACK_IMPORTED_MODULE_4_moment__(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas").child(item.key).remove().catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos"); });
            }
        }
    };
    MisReservasPage.prototype.ConfirmarCancelarReserva = function (reserva) {
        this.reservaSeleccionada = reserva;
        this.MostrarAlert("", "\u00BFSeguro que deseas cancelar tu reserva para el " + this.reservaSeleccionada.horario + " Hs.?", "Sí", this.CancelarRerserva);
    };
    MisReservasPage.prototype.CancelarRerserva = function () {
        var _this = this;
        this.OcultarAlert();
        this.ocultarInterfazMesas = false;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas").child(this.reservaSeleccionada.key).remove().then(function () {
            _this.ocultarSpinner = true;
            _this.presentToast("Se ha cancelado la reserva.");
        });
    };
    MisReservasPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    MisReservasPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    MisReservasPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: 'top',
            duration: 3000,
            cssClass: "infoToast"
        });
        toast.present();
    };
    MisReservasPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    MisReservasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mis-reservas',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\mis-reservas\mis-reservas.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n      <button ion-button outline (click)="OcultarAlert()">No</button>\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <div class="sin-elementos" *ngIf="ocultarSpinner  && reservasPendientes.length == 0 && reservasConfirmadas.length == 0">\n\n    <img src="../../assets/imgs/alfa/empty.png" />\n\n    <h1>Todavía no has hecho reservas.</h1>\n\n  </div>\n\n\n\n  <ng-container *ngIf="ocultarSpinner && reservasPendientes.length > 0">\n\n    <h2 class="titulo">Reservas pendientes de confirmación</h2>\n\n  </ng-container>\n\n\n\n  <ion-list>\n\n\n\n    <ion-item *ngFor="let item of reservasPendientes">\n\n\n\n      <h1>{{item.horario}} Hs.</h1>\n\n      <p>Cantidad de personas • {{item.cantidadPersonas}}</p>\n\n\n\n      <button ion-button clear item-end (click)="ConfirmarCancelarReserva(item)">\n\n        <ion-icon style="color: #2f2f2f;" name="close"></ion-icon>\n\n      </button>\n\n\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <ng-container *ngIf="ocultarSpinner && reservasConfirmadas.length > 0">\n\n    <h2 class="titulo">Reservas confirmadas</h2>\n\n  </ng-container>\n\n\n\n  <ion-list>\n\n\n\n    <ion-item *ngFor="let item of reservasConfirmadas">\n\n\n\n      <h1>{{item.horario}} Hs.</h1>\n\n      <p>Cantidad de personas • {{item.cantidadPersonas}}</p>\n\n      <p>Mesa • {{item.mesa}}</p>\n\n\n\n      <button ion-button clear item-end (click)="ConfirmarCancelarReserva(item)">\n\n        <ion-icon style="color: #2f2f2f;" name="close"></ion-icon>\n\n      </button>\n\n\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\mis-reservas\mis-reservas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], MisReservasPage);
    return MisReservasPage;
}());

//# sourceMappingURL=mis-reservas.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuentaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__principal_principal__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CuentaPage = /** @class */ (function () {
    function CuentaPage(navCtrl, navParams, barcodeScanner, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.toastCtrl = toastCtrl;
        this.estado = "ocultar";
        this.estadoBoton = false;
        this.ocultarSpinner = false;
        this.firebase = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a;
        this.ocultarAlert = true;
        this.alertMostrarBotonCancelar = true;
        console.clear();
        this.rate = 1;
        this.textoDelBoton = "pagar";
        this.textoRate = "Malo";
        this.propina = 0;
        this.propinaTotal = 0;
        this.subTotal = 0;
        this.total = 0;
        this.pedidos = [];
        var usuariosRef = this.firebase.database().ref("usuarios");
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.mesa = "";
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.mesa = data[item].mesa;
                    _this.keyCliente = item;
                    break;
                }
            }
        }).then(function () {
            var pedidoRef = _this.firebase.database().ref("pedidos").child(_this.mesa);
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    for (var subItem in data[item]) {
                        if (typeof (data[item][subItem]) != "string") {
                            _this.pedidos.push(data[item][subItem]);
                        }
                    }
                }
                _this.total = _this.subTotal = _this.pedidos.reduce(function (valorAnterior, valorActual, indice) {
                    if (indice > 1)
                        return valorAnterior + valorActual.cantidad * valorActual.precio;
                    else
                        return valorAnterior.cantidad * valorAnterior.precio + valorActual.cantidad * valorActual.precio;
                });
                if (data.desc) {
                    _this.descuento = _this.subTotal * 0.1;
                    _this.subTotal -= _this.descuento;
                }
                _this.estado = "cuenta";
                _this.ocultarSpinner = true;
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
    }
    CuentaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CuentaPage');
    };
    CuentaPage.prototype.Votar = function () {
        switch (this.rate) {
            case 1:
                this.propina = 0;
                this.textoRate = "Malo";
                break;
            case 2:
                this.propina = 5;
                this.textoRate = "Regular";
                break;
            case 3:
                this.propina = 10;
                this.textoRate = "Bien";
                break;
            case 4:
                this.propina = 15;
                this.textoRate = "Muy bien";
                break;
            case 5:
                this.propina = 20;
                this.textoRate = "Excelente";
                break;
            default:
                this.textoRate = "Hola";
                break;
        }
        //this.propinaTotal = (this.subTotal * this.propina) / 100;
        this.total = this.subTotal + ((this.subTotal * this.propina) / 100);
        if (this.rate > 1)
            this.textoDelBoton = "Verificar mesa";
        else
            this.textoDelBoton = "Pagar";
    };
    CuentaPage.prototype.Pagar = function () {
        var _this = this;
        if (this.textoDelBoton == "Verificar mesa") {
            var options = { prompt: "Verificá tu mesa para dar tu propina.", formats: "QR_CODE" };
            this.barcodeScanner.scan(options).then(function (barcodeData) {
                if (barcodeData.text == _this.mesa)
                    _this.textoDelBoton = "Pagar";
                else
                    _this.presentToast("Ese QR no pertenece a tu mesa.");
            }).catch(function (err) { });
        }
        else {
            var clienteRef_1 = this.firebase.database().ref("usuarios").child(this.keyCliente);
            var pedidoRef = this.firebase.database().ref("pedidos").child(this.mesa);
            var mesaRef_1 = this.firebase.database().ref("mesas");
            this.estadoBoton = true;
            this.ocultarSpinner = false;
            pedidoRef.remove().then(function () {
                clienteRef_1.child("estado").remove().then(function () {
                    clienteRef_1.child("comensales").remove().then(function () {
                        clienteRef_1.child("juegoFer").remove().then(function () {
                            clienteRef_1.child("juegoFacu").remove().then(function () {
                                clienteRef_1.child("juegoAxel").remove().then(function () {
                                    clienteRef_1.child("mesa").remove().then(function () {
                                        mesaRef_1.once("value", function (snap) {
                                            var data = snap.val();
                                            var _loop_1 = function (item) {
                                                if (data[item].numeroMesa == _this.mesa) {
                                                    mesaRef_1.child(item).update({ estado: "libre" }).then(function () {
                                                        mesaRef_1.child(item).child("cliente").remove().then(function () {
                                                            mesaRef_1.child(item).child("tiempoMinimo").remove().then(function () {
                                                                _this.MostrarAlert("Éxito!", "Gracias por comer en nuestro restaurante, nos ayudaría mucho que completases una encuesta sobre tu experiencia en el lugar.", "Ok", _this.Redireccionar);
                                                                _this.ocultarSpinner = true;
                                                            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                                    ;
                                                    return "break";
                                                }
                                            };
                                            for (var item in data) {
                                                var state_1 = _loop_1(item);
                                                if (state_1 === "break")
                                                    break;
                                            }
                                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                        }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                    }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }
    };
    CuentaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    CuentaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    CuentaPage.prototype.Redireccionar = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__principal_principal__["a" /* PrincipalPage */]);
    };
    CuentaPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    CuentaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cuenta',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\cuenta\cuenta.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n      <button ion-button outline (click)="Logout()" *ngIf="alertMostrarBotonCancelar">Ahora no</button>\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n  \n\n</div>\n\n\n\n<ion-content padding>\n\n\n\n  <div [class]="estado">\n\n\n\n    <div style="width: 100%;text-align: center;margin: 0;position: relative;">\n\n        <h1>Cuenta</h1>\n\n    </div>\n\n\n\n    <ng-container *ngFor="let item of pedidos">\n\n\n\n      <div>\n\n        <span>{{item.nombre}}</span><span style="float: right;">${{item.cantidad * item.precio}}</span>\n\n      </div>\n\n      <div class="puntos"></div>\n\n      \n\n    </ng-container>\n\n\n\n    <ng-container *ngIf="descuento">\n\n      <div>\n\n        <span>Descuento del 10% por jugar</span><span style="float: right;">(${{descuento}})</span>\n\n      </div>\n\n      <div class="puntos"></div>\n\n    </ng-container>\n\n\n\n    <!--<div>\n\n        <span>Propina</span><span style="float: right;">${{propinaTotal}}</span>\n\n    </div>-->\n\n    <div class="puntos"></div>\n\n\n\n    <div >\n\n        <span class="total">Total</span><span style="float: right;">${{total}}</span>\n\n    </div>\n\n    <div class="puntos"></div>\n\n\n\n    <span class="rating">¡Calificá nuestro servicio y dejá tu propina!</span>\n\n\n\n    <rating\n\n      [(ngModel)]="rate" \n\n      readOnly="false" \n\n      max="5" \n\n      emptyStarIconName="star-outline" \n\n      halfStarIconName="star-half" \n\n      starIconName="star" \n\n      nullable="false"\n\n      (ngModelChange)="Votar()">\n\n      \n\n    </rating>\n\n\n\n    <span class="rating">{{textoRate}} ({{propina}}% de propina)</span>\n\n\n\n    <button ion-button color="dark" [disabled]="estadoBoton" (click)="Pagar()">{{textoDelBoton}}</button>\n\n\n\n  </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\cuenta\cuenta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], CuentaPage);
    return CuentaPage;
}());

//# sourceMappingURL=cuenta.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadoReservasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListadoReservasPage = /** @class */ (function () {
    function ListadoReservasPage(navCtrl, navParams, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.image = "";
        this.ocultarImagen = true;
        this.ocultarSpinner = false;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.reservas = [];
        this.reservasPendientes = [];
        this.reservasConfirmadas = [];
        this.mesas = [];
        this.ocultarInterfazMesas = true;
        this.ejecutarSetInterval = true;
        setInterval(function () {
            _this.reservasPendientes = _this.reservasPendientes;
            _this.reservasConfirmadas = _this.reservasConfirmadas;
        }, 500);
        var reservasRef = this.firebase.database().ref("reservas");
        reservasRef.on("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var contador = 0;
            console.clear();
            for (var item in data) {
                _this.reservas.push(data[item]);
                _this.reservas[contador].key = item;
                contador++;
            }
            _this.reservasPendientes = _this.reservas.filter(function (item) {
                return item.estado == "pendiente";
            });
            _this.reservasConfirmadas = _this.reservas.filter(function (item) {
                return item.estado == "confirmada";
            });
            if (_this.ejecutarSetInterval) {
                _this.VerificarReservasPasadasDeTiempo();
                _this.ejecutarSetInterval = false;
                setInterval(function () {
                    _this.VerificarReservasPasadasDeTiempo();
                }, 1000 * 60);
            }
            _this.ocultarSpinner = true;
        });
    }
    ListadoReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListadoReservasPage');
    };
    ListadoReservasPage.prototype.VerificarReservasPasadasDeTiempo = function () {
        var _this = this;
        var momentoActual = __WEBPACK_IMPORTED_MODULE_4_moment__(new Date());
        for (var _i = 0, _a = this.reservas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (momentoActual.diff(__WEBPACK_IMPORTED_MODULE_4_moment__(item.horario, "DD/MM/YYYY HH:mm"), "m") > 20) {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas").child(item.key).remove().catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos"); });
            }
        }
    };
    ListadoReservasPage.prototype.DesplegarMesas = function (reservaSeleccionada) {
        var _this = this;
        this.mesas = [];
        this.reservaSeleccionada = reservaSeleccionada;
        var mesasRef = this.firebase.database().ref("mesas");
        var momentoReservaSeleccionada = __WEBPACK_IMPORTED_MODULE_4_moment__(reservaSeleccionada.horario, "DD/MM/YYYY HH:mm");
        mesasRef.once("value", function (snap) {
            var data = snap.val();
            _this.reservas = [];
            var estaDesocupada;
            for (var item in data) {
                estaDesocupada = true;
                for (var _i = 0, _a = _this.reservasConfirmadas; _i < _a.length; _i++) {
                    var reserva = _a[_i];
                    if (data[item].numeroMesa == reserva.mesa) {
                        var momentoReservaMesa = __WEBPACK_IMPORTED_MODULE_4_moment__(reserva.horario, "DD/MM/YYYY HH:mm");
                        if (Math.abs(momentoReservaSeleccionada.diff(momentoReservaMesa, "m")) < 40) {
                            estaDesocupada = false;
                            break;
                        }
                    }
                }
                if (data[item].cantidadComensales >= reservaSeleccionada.cantidadPersonas && estaDesocupada)
                    _this.mesas.push({ numero: data[item].numeroMesa, seleccionado: "" });
            }
            _this.mesas = _this.mesas.sort(function (a, b) {
                return a.numero - b.numero;
            });
            _this.ocultarInterfazMesas = false;
        });
    };
    ListadoReservasPage.prototype.Seleccionar = function (numero) {
        for (var _i = 0, _a = this.mesas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.numero == numero)
                item.seleccionado = "selected";
            else
                item.seleccionado = "";
        }
    };
    ListadoReservasPage.prototype.Confirmar = function () {
        var _this = this;
        var reservaRef = this.firebase.database().ref("reservas").child(this.reservaSeleccionada.key);
        var numeroDeMesa;
        var seleccionoMesa = false;
        for (var _i = 0, _a = this.mesas; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.seleccionado == "selected") {
                numeroDeMesa = item.numero;
                seleccionoMesa = true;
                break;
            }
        }
        if (seleccionoMesa) {
            this.ocultarSpinner = false;
            reservaRef.update({
                estado: "confirmada",
                mesa: numeroDeMesa
            }).then(function () {
                _this.ocultarSpinner = true;
                _this.OcultarInterfaz();
                _this.presentToast("Se ha confirmado la reserva.");
            });
        }
        else {
            this.presentToast("Selecciona una mesa antes de continuar.");
        }
    };
    ListadoReservasPage.prototype.ConfirmarCancelarReserva = function (reserva) {
        this.reservaSeleccionadaParaCancelar = reserva;
        this.MostrarAlert("", "\u00BFSeguro que deseas cancelar la reserva de " + this.reservaSeleccionadaParaCancelar.apellido + ", " + this.reservaSeleccionadaParaCancelar.nombre + " para el " + this.reservaSeleccionadaParaCancelar.horario + " Hs.?", "Sí", this.CancelarRerserva);
    };
    ListadoReservasPage.prototype.CancelarRerserva = function () {
        var _this = this;
        this.OcultarAlert();
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas").child(this.reservaSeleccionadaParaCancelar.key).remove().then(function () {
            _this.ocultarSpinner = true;
            _this.presentToast("Se ha cancelado la reserva.");
        });
    };
    ListadoReservasPage.prototype.OcultarInterfaz = function () {
        this.ocultarInterfazMesas = true;
    };
    ListadoReservasPage.prototype.MostrarImagen = function (imagen) {
        this.image = imagen;
        this.ocultarImagen = false;
    };
    ListadoReservasPage.prototype.OcultarImagen = function () {
        this.ocultarImagen = true;
    };
    ListadoReservasPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    ListadoReservasPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    ListadoReservasPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    ListadoReservasPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    ListadoReservasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-listado-reservas',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\listado-reservas\listado-reservas.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div class="imagen" [ngClass]="{\'ocultar\':ocultarImagen,\'opacidad\':true}">\n\n\n\n  <ion-icon name="close" (click)="OcultarImagen()"></ion-icon>\n\n  <img [src]="image" alt="">\n\n\n\n</div>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n      <button ion-button outline (click)="OcultarAlert()">No</button>\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <div class="sin-elementos" *ngIf="ocultarSpinner  && reservasPendientes.length == 0 && reservasConfirmadas.length == 0">\n\n    <img src="../../assets/imgs/alfa/empty.png" />\n\n    <h1>No hay reservas disponibles.</h1>\n\n  </div>\n\n\n\n  <ng-container *ngIf="ocultarSpinner && reservasPendientes.length > 0">\n\n    <h2 class="titulo">Reservas pendientes de confirmación</h2>\n\n  </ng-container>\n\n\n\n  <ion-list>\n\n\n\n    <ion-item *ngFor="let item of reservasPendientes">\n\n      <ion-thumbnail item-start (click)="MostrarImagen(item.img)">\n\n        <img src={{item.img}}>\n\n      </ion-thumbnail>\n\n\n\n      <h1>{{item.apellido}}, {{item.nombre}}</h1>\n\n      <p>Horario • {{item.horario}} Hs.</p>\n\n      <p>Cantidad de personas • {{item.cantidadPersonas}}</p>\n\n\n\n      <div item-end style="display: flex; align-items: center;align-content: center;flex-direction: column;">\n\n\n\n        <button ion-button clear (click)="DesplegarMesas(item)" style="margin-bottom: 20px;">\n\n          <ion-icon style="color: #CAFF4F;" name="checkmark-circle-outline"></ion-icon>\n\n        </button>\n\n\n\n        <button ion-button clear (click)="ConfirmarCancelarReserva(item)">\n\n          <ion-icon style="color: #FF0000;" name="close"></ion-icon>\n\n        </button>\n\n\n\n      </div>\n\n\n\n\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <ng-container *ngIf="ocultarSpinner && reservasConfirmadas.length > 0">\n\n    <h2 class="titulo">Reservas confirmadas</h2>\n\n  </ng-container>\n\n\n\n  <ion-list>\n\n\n\n    <ion-item *ngFor="let item of reservasConfirmadas">\n\n\n\n      <ion-thumbnail item-start (click)="MostrarImagen(item.img)">\n\n        <img src={{item.img}} />\n\n      </ion-thumbnail>\n\n\n\n      <h1>{{item.apellido}}, {{item.nombre}}</h1>\n\n      <p>Horario • {{item.horario}} Hs.</p>\n\n      <p>Cantidad de personas • {{item.cantidadPersonas}}</p>\n\n      <p>Mesa • {{item.mesa}}</p>\n\n\n\n      <button item-end ion-button clear (click)="ConfirmarCancelarReserva(item)">\n\n        <ion-icon style="color: #FF0000;" name="close"></ion-icon>\n\n      </button>\n\n\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <div [ngClass]="{\'interfaz-mesas\':true,\'ocultar\':ocultarInterfazMesas}">\n\n\n\n    <h1>Selecciona una mesa para la reserva</h1>\n\n    <div class="mesas">\n\n      <button ion-button color="dark" class="mesa {{item.seleccionado}}" (click)="Seleccionar(item.numero)" *ngFor="let item of mesas">{{item.numero}}</button>\n\n    </div>\n\n\n\n    <div class="botones-interfaz-mesa">\n\n      <button ion-button color="dark" (click)="OcultarInterfaz()">Cancelar</button>\n\n      <button ion-button color="dark" (click)="Confirmar()">Confirmar</button>\n\n    </div>\n\n\n\n  </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\listado-reservas\listado-reservas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ListadoReservasPage);
    return ListadoReservasPage;
}());

//# sourceMappingURL=listado-reservas.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalaDeJuegosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__juego_uno_juego_uno__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__juego_juego__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__juego_dos_juego_dos__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SalaDeJuegosPage = /** @class */ (function () {
    function SalaDeJuegosPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.juegos = [
            { accion: "Preguntas y respuestas", img: "preguntas-respuestas.jpg", ruta: __WEBPACK_IMPORTED_MODULE_2__juego_uno_juego_uno__["a" /* JuegoUnoPage */] },
            { accion: "Juego de la memoria", img: "memoria.jpg", ruta: __WEBPACK_IMPORTED_MODULE_5__juego_juego__["a" /* JuegoPage */] },
            { accion: "Agilidad aritmética", img: "agilidad-aritmetica.jpg", ruta: __WEBPACK_IMPORTED_MODULE_6__juego_dos_juego_dos__["a" /* JuegoDosPage */] }
        ];
    }
    SalaDeJuegosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalaDeJuegosPage');
    };
    SalaDeJuegosPage.prototype.Redireccionar = function (ruta) {
        this.navCtrl.push(ruta);
    };
    SalaDeJuegosPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    SalaDeJuegosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sala-de-juegos',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\sala-de-juegos\sala-de-juegos.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-nav #content swipeBackEnabled="false"></ion-nav>\n\n\n\n<ion-content class="card-background-page" padding>\n\n\n\n  <button ion-button *ngFor="let item of juegos" (click)="Redireccionar(item.ruta)">\n\n    <div class="sombreado"></div>\n\n    <img src="../../assets/imgs/alfa/{{item.img}}" />\n\n    <span>{{item.accion}}</span>\n\n  </button>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\sala-de-juegos\sala-de-juegos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SalaDeJuegosPage);
    return SalaDeJuegosPage;
}());

//# sourceMappingURL=sala-de-juegos.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JuegoUnoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JuegoUnoPage = /** @class */ (function () {
    function JuegoUnoPage(navCtrl, navParams, toastCtrl, nativeAudio) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.nativeAudio = nativeAudio;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.estadoBoton = true;
        this.ocultarAlert = true;
        this.ocultarSpinner = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.puedeGanarPostre = true;
        this.segundos = 10;
        this.MostrarAlert("Preguntas y respuestas", "Responde correctamente 5 preguntas aleatorias seguidas para ganar! Un postre gratis espera a quienes triunfen en el primer intento!", "Hecho", this.EmpezarJuego);
        this.nativeAudio.preloadSimple('acierto', 'assets/audios/alfa/acierto.mp3').catch(function (error) { });
        this.nativeAudio.preloadSimple('fallo', 'assets/audios/alfa/fallo.mp3').catch(function (error) { });
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.usuarioKey = item;
                    _this.usuarioMesa = data[item].mesa;
                    if (data[item].juegoFer) {
                        _this.puedeGanarPostre = false;
                    }
                }
            }
        }).then(function () {
            _this.estadoBoton = false;
            _this.ocultarSpinner = true;
        });
        this.preguntas = [
            { pregunta: "¿Cuál es la ciudad más poblada del mundo?", respuesta: "Tokio", opcion1: "Nueva York", opcion2: "Tokio", opcion3: "Seúl", opcion4: "Los Ángeles" },
            { pregunta: "¿Cuántos huesos tiene el cuerpo humano?", respuesta: "206", opcion1: "208", opcion2: "200", opcion3: "206", opcion4: "210" },
            { pregunta: "¿Cuál es el río más grande del mundo?", respuesta: "Río Amazonas", opcion1: "Río Amazonas", opcion2: "Nilo", opcion3: "Río Misisipi", opcion4: "Río Amarillo" },
            { pregunta: "¿De dónde son originarios los juegos olímpicos?", respuesta: "Olimpia", opcion1: "Londres", opcion2: "Chipre", opcion3: "Cerdeña", opcion4: "Olimpia" },
            { pregunta: "¿Quién escribió \"La Odisea\"?", respuesta: "Homero", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
            { pregunta: "¿Quién pintó \"La última cena\"?", respuesta: "Leonardo da Vinci", opcion1: "Pablo Picasso", opcion2: "Vincent van Gogh", opcion3: "Leonardo da Vinci", opcion4: "Salvador Dalí" },
            { pregunta: "¿Cuál es el país más grande del mundo?", respuesta: "Rusia", opcion1: "Estados Unidos", opcion2: "Rusia", opcion3: "Brazil", opcion4: "Australia" },
            { pregunta: "¿En qué año empezó la segunda guerra mundial?", respuesta: "1939", opcion1: "1940", opcion2: "1935", opcion3: "1942", opcion4: "1939" },
            { pregunta: "¿Cuál es el quinto planeta en el sistema solar?", respuesta: "Júpiter", opcion1: "Júpiter", opcion2: "Urano", opcion3: "Marte", opcion4: "Venus" },
            { pregunta: "¿Cuál es la capital de Suecia?", respuesta: "Estocolmo", opcion1: "Gotemburgo", opcion2: "Upsala", opcion3: "Estocolmo", opcion4: "Kalmar" },
            { pregunta: "¿Cuál es el nombre oficial de la lengua china?", respuesta: "Mandarín", opcion1: "Chino", opcion2: "Hiragano", opcion3: "Asiático", opcion4: "Mandarín" },
            { pregunta: "¿Cómo se llama la estación espacial rusa?", respuesta: "MIR", opcion1: "NASA", opcion2: "MIR", opcion3: "ISS", opcion4: "La Salyut" },
            { pregunta: "¿Cuál fue el primer metal que empleó el hombre?", respuesta: "Cobre", opcion1: "Cobre", opcion2: "Acero", opcion3: "Plata", opcion4: "Titanio" },
            { pregunta: "¿De qué lengua proviene el español?", respuesta: "Latín", opcion1: "Italiano", opcion2: "Griego", opcion3: "Castellano", opcion4: "Latín" },
            { pregunta: "¿Quién originó la frase \"solo sé que no sé nada\"?", respuesta: "Sócrates", opcion1: "Platón", opcion2: "Sócrates", opcion3: "Aristóteles", opcion4: "Pitágoras" },
            { pregunta: "¿Quién es el autor de la novela \"Don Quijote de la Mancha\"?", respuesta: "Miguel de Cervantes", opcion1: "Homero", opcion2: "Miguel de Cervantes", opcion3: "Jorge Luis Borges", opcion4: "Julio Verne" },
            { pregunta: "¿Qué instrumento óptico permite ver los astros de cerca?", respuesta: "Telescopio", opcion1: "Telescopio", opcion2: "Microscopio", opcion3: "Television", opcion4: "Lupa" },
            { pregunta: "¿Cuál es el único mamífero capaz de volar?", respuesta: "Murciélago", opcion1: "Colibrí barbinegro", opcion2: "Pez volador", opcion3: "Búho", opcion4: "Murciélago" },
            { pregunta: "¿Cuántos dientes tiene una persona adulta?", respuesta: "32", opcion1: "32", opcion2: "35", opcion3: "30", opcion4: "34" },
            { pregunta: "Según los escritos bíblicos, ¿Quién traicionó a Jesús?", respuesta: "Judas", opcion1: "Abel", opcion2: "Jacob‎", opcion3: "Judas", opcion4: "Moisés‎" },
            { pregunta: "¿Cuántos años duró la guerra de los 100 años?", respuesta: "116 años", opcion1: "100 años", opcion2: "116 años", opcion3: "117 años", opcion4: "105 años" },
            { pregunta: "¿Cómo se llama la ciencia que estudia los mapas?", respuesta: "Cartografía", opcion1: "Cartografía", opcion2: "Geografía", opcion3: "Oceanografía", opcion4: "Ciencias sociales" },
            { pregunta: "¿Cuál es el lugar más frío de la tierra?", respuesta: "La Antártida", opcion1: "Polo sur", opcion2: "Polo norte", opcion3: "Tierra del Fuego", opcion4: "La Antártida" },
            { pregunta: "¿En qué país se encuentra la torre de Pisa?", respuesta: "Italia", opcion1: "Grecia", opcion2: "Francia", opcion3: "Portugal", opcion4: "Italia" },
            { pregunta: "¿En qué año llegó Cristóbal Colón a América?", respuesta: "1942", opcion1: "1940", opcion2: "1942", opcion3: "1937", opcion4: "1945" },
            { pregunta: "¿Dónde se encuentra la famosa \"Torre Eiffel\"?", respuesta: "Francia", opcion1: "Francia", opcion2: "Grecia", opcion3: "Portugal", opcion4: "Italia" },
            { pregunta: "¿En qué lugar del cuerpo se produce la insulina?", respuesta: "En el pancreas", opcion1: "En el apéndice", opcion2: "En la vejiga", opcion3: "En el estómago", opcion4: "En el pancreas" },
            { pregunta: "¿Qué rama de la biología estudia los animales?", respuesta: "La zoología", opcion1: "La zoología", opcion2: "La ictiología", opcion3: "La entomología", opcion4: "La ornitología" }
        ];
        this.preguntasAcertadas = 0;
        this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;
        this.preguntaSeleccionada = this.preguntas[this.indice];
        this.respuestaUsuario = this.preguntaSeleccionada.opcion1;
    }
    JuegoUnoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoUnoPage');
    };
    JuegoUnoPage.prototype.ionViewDidLeave = function () {
        clearInterval(this.intervalID);
    };
    JuegoUnoPage.prototype.Validar = function () {
        console.log(this.respuestaUsuario);
        if (this.respuestaUsuario == this.preguntaSeleccionada.respuesta) {
            this.NuevaPregunta();
        }
        else {
            this.Perder("¡Respuesta incorrecta!");
        }
    };
    JuegoUnoPage.prototype.NuevaPregunta = function () {
        var _this = this;
        this.preguntasAcertadas++;
        if (localStorage.getItem("sonidos") != "false") {
            this.nativeAudio.play('acierto').catch(function (error) { });
        }
        if (this.preguntasAcertadas == 5) {
            if (this.puedeGanarPostre) {
                this.estadoBoton = true;
                this.ocultarSpinner = false;
                clearInterval(this.intervalID);
                this.MostrarAlert("¡Ganaste!", "¡Tu postre gratis aguarda!", "Volver", this.Volver);
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(function () {
                    __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").push({
                        cantidad: 1,
                        nombre: "postre gratuito",
                        precio: 0
                    }).then(function () {
                        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(function () {
                            _this.estadoBoton = false;
                            _this.ocultarSpinner = true;
                        });
                    });
                }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
            }
            else {
                clearInterval(this.intervalID);
                this.MostrarAlert("¡Ganaste!", "", "Volver", this.Volver);
            }
        }
        else {
            this.presentToast("¡Respuesta correcta!");
            this.preguntas.splice(this.indice, 1);
            this.indice = Math.floor(Math.random() * (this.preguntas.length - 0)) + 0;
            this.preguntaSeleccionada = this.preguntas[this.indice];
            this.respuestaUsuario = this.preguntaSeleccionada.opcion1;
            this.segundos = 10;
        }
    };
    JuegoUnoPage.prototype.EmpezarJuego = function () {
        this.OcultarAlert();
        this.Timer();
    };
    JuegoUnoPage.prototype.Perder = function (titulo) {
        var _this = this;
        if (localStorage.getItem("sonidos") != "false") {
            this.nativeAudio.play('fallo').catch(function (error) { });
        }
        this.MostrarAlert(titulo, "M\u00E1s suerte la pr\u00F3xima.", "Volver", this.Volver);
        clearInterval(this.intervalID);
        if (this.puedeGanarPostre) {
            this.estadoBoton = true;
            this.ocultarSpinner = false;
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios").child(this.usuarioKey).update({ juegoFer: true }).then(function () {
                _this.estadoBoton = false;
                _this.ocultarSpinner = true;
            }).catch(function () { return _this.presentToast("Ups... Tenemos problemas técnicos."); });
        }
    };
    JuegoUnoPage.prototype.Timer = function () {
        var _this = this;
        this.intervalID = setInterval(function () {
            _this.segundos--;
            if (_this.segundos == 0) {
                _this.Perder("¡Se acabó el tiempo!");
            }
        }, 1000);
    };
    JuegoUnoPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    JuegoUnoPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    JuegoUnoPage.prototype.Volver = function () {
        this.navCtrl.pop();
    };
    JuegoUnoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    JuegoUnoPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            // localStorage.setItem("desloguear", "true");
                            // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    JuegoUnoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-juego-uno',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego-uno\juego-uno.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n\n\n      <button ion-button outline [disabled]="estadoBoton" (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-content>\n\n\n\n  <div class="puntos">\n\n    <span>Aciertos: <span class="preguntas-acertadas">{{preguntasAcertadas}}</span>/5</span><br>\n\n    <span>Tiempo restante: {{segundos}} segundos</span>\n\n  </div>\n\n\n\n  <h1 class="pregunta">{{preguntaSeleccionada.pregunta}}</h1>\n\n\n\n  <div class="interfaz">\n\n    <ion-list radio-group [(ngModel)]="respuestaUsuario">\n\n      <ion-item>\n\n        <ion-label>{{preguntaSeleccionada.opcion1}}</ion-label>\n\n        <ion-radio item-left color="red" value="{{preguntaSeleccionada.opcion1}}"></ion-radio>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>{{preguntaSeleccionada.opcion2}}</ion-label>\n\n        <ion-radio item-left color="dark" value="{{preguntaSeleccionada.opcion2}}"></ion-radio>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>{{preguntaSeleccionada.opcion3}}</ion-label>\n\n        <ion-radio item-left color="dark" value="{{preguntaSeleccionada.opcion3}}"></ion-radio>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>{{preguntaSeleccionada.opcion4}}</ion-label>\n\n        <ion-radio item-left color="dark" value="{{preguntaSeleccionada.opcion4}}"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <button ion-button color="btn-verde" (click)="Validar()">Responder</button>\n\n\n\n  </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego-uno\juego-uno.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], JuegoUnoPage);
    return JuegoUnoPage;
}());

//# sourceMappingURL=juego-uno.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JuegoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JuegoPage = /** @class */ (function () {
    function JuegoPage(navCtrl, navParams, authInstance, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.nativeAudio = nativeAudio;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.taparJuego = false;
        this.animacion = [];
        this.fotos = [];
        this.coincide = false;
        this.imgMostrar = [];
        this.contadorJugadas = 0;
        this.tiempo = "";
        this.mensaje = "";
        this.juegoIniciado = false;
        this.gano = false;
        this.mostrarAlert = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        //this.authInstance.auth.signInWithEmailAndPassword("lucas@soylucas.com", "Wwwwwwe");
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).correo;
        this.nativeAudio.preloadSimple('simple', 'assets/audio/beta/simple.mp3').catch(function () { });
        this.nativeAudio.preloadSimple('coincide', 'assets/audio/beta/coincide.mp3').catch(function () { });
        //Ademas de obtener la mesa tambien me fijo si el usuario ya jugo este juego
        this.ObtenerMesa();
        for (var i = 0; i < 16; i++) {
            this.imgMostrar.push({ img: "assets/imgs/beta/elLogo.png", ok: true });
            this.animacion.push(false);
        }
        this.fotos.push({ img: "assets/imgs/beta/empanada.jpg", clave: 1, id: 1 });
        this.fotos.push({ img: "assets/imgs/beta/pizza.jpg", clave: 2, id: 2 });
        this.fotos.push({ img: "assets/imgs/beta/hamburguesa.jpg", clave: 3, id: 3 });
        this.fotos.push({ img: "assets/imgs/beta/milanesa.jpg", clave: 4, id: 4 });
        this.fotos.push({ img: "assets/imgs/beta/vino.jpg", clave: 5, id: 5 });
        this.fotos.push({ img: "assets/imgs/beta/jugo.jpg", clave: 6, id: 6 });
        this.fotos.push({ img: "assets/imgs/beta/papas.jpg", clave: 7, id: 7 });
        this.fotos.push({ img: "assets/imgs/beta/fondoPedido.jpg", clave: 8, id: 8 });
        this.fotos.push({ img: "assets/imgs/beta/empanada.jpg", clave: 1, id: 9 });
        this.fotos.push({ img: "assets/imgs/beta/pizza.jpg", clave: 2, id: 10 });
        this.fotos.push({ img: "assets/imgs/beta/hamburguesa.jpg", clave: 3, id: 11 });
        this.fotos.push({ img: "assets/imgs/beta/milanesa.jpg", clave: 4, id: 12 });
        this.fotos.push({ img: "assets/imgs/beta/vino.jpg", clave: 5, id: 13 });
        this.fotos.push({ img: "assets/imgs/beta/jugo.jpg", clave: 6, id: 14 });
        this.fotos.push({ img: "assets/imgs/beta/papas.jpg", clave: 7, id: 15 });
        this.fotos.push({ img: "assets/imgs/beta/fondoPedido.jpg", clave: 8, id: 16 });
        this.fotos = this.fotos.sort(function () { return Math.random() - 0.5; });
        this.puntos = 0;
    }
    JuegoPage.prototype.Jugar = function () {
        var _this = this;
        this.juegoIniciado = true;
        var tope = new Date().getTime();
        tope = tope + 60 * 1000;
        var countDownDate = new Date(tope).getTime();
        this.x = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            _this.tiempo = minutes + ":" + seconds;
            if (distance < 0) {
                clearInterval(_this.x);
                _this.gano = false;
                //Me fijo si jugo o si no para subirle el estado
                if (!_this.yaJugo) {
                    console.log(_this.jugadorActual);
                    console.log(_this.claveJugador);
                    var usuariosRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios/" + _this.claveJugador);
                    //this.claveActual=key;
                    usuariosRef.set(_this.jugadorActual).then(function () {
                        _this.mensaje = "El tiempo se acabó, juego terminado, ustéd pierde";
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                        }, 4000);
                    });
                }
                _this.tiempo = "Juego finalizado";
                _this.taparJuego = true;
                _this.puntos = 0;
                for (var i = 0; i < 16; i++) {
                    _this.imgMostrar[i] = { img: "assets/imgs/beta/elLogo.png", ok: true };
                }
                //Aca muestro el alert de que perdio.
                _this.mensaje = "El tiempo se acabó, juego terminado, ustéd pierde";
                _this.mostrarAlert = true;
                setTimeout(function () {
                    _this.mostrarAlert = false;
                    _this.navCtrl.pop();
                }, 4000);
            }
        });
    };
    JuegoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoPage');
    };
    JuegoPage.prototype.Salir = function () {
        this.navCtrl.pop();
    };
    JuegoPage.prototype.cambiarImagen = function (valor) {
        var _this = this;
        console.log(this.contadorJugadas);
        console.log(this.puntos);
        valor = parseInt(valor);
        valor = valor - 1;
        var imgMostrar = "imgMostrar" + valor;
        if (this.imgMostrar[valor].ok == false) {
            return;
        }
        this.contadorJugadas = this.contadorJugadas + 1;
        this.imgMostrar[valor].img = this.fotos[valor].img;
        //this.contadorJugadas = this.contadorJugadas +1;
        if (this.contadorJugadas == 1) {
            //Pregunto si esta desactivado el sonido.
            if (localStorage.getItem("sonidos") != "false") {
                this.nativeAudio.play('simple').catch(function () { });
            }
            //Aca permito que se de vuelta la imagen
            this.valorViejo = valor;
            this.primerId = this.fotos[valor].id;
            this.claveActual = this.fotos[valor].clave;
        }
        if (this.contadorJugadas == 2) {
            //Aca necesito que aunque clikee no me de vuelta la imagen ni haga nada
            this.taparJuego = true;
            if (this.primerId == this.fotos[valor].id) {
                console.log(this.primerId);
                console.log(this.fotos[valor].id);
                this.contadorJugadas = 1;
                this.taparJuego = false;
                return;
            }
            if (this.claveActual == this.fotos[valor].clave) {
                this.claveActual = "";
                this.coincide = true;
                this.imgMostrar[this.valorViejo].ok = false;
                this.imgMostrar[valor].ok = false;
                this.animacion[valor] = true;
                this.animacion[this.valorViejo] = true;
                if (localStorage.getItem("sonidos") != "false") {
                    this.nativeAudio.play('coincide').catch(function () { });
                }
                this.puntos = this.puntos + 10;
                if (this.puntos == 80) {
                    //  this.miCon.CargarScore(this.token.correo, "puntajeJM", this.puntos.toString()).subscribe(
                    //exito => console.log("Exito" + JSON.stringify(exito)),
                    // error => console.log("Error" + JSON.stringify(error))
                    // );
                    // this.IniciarJuego();
                    this.gano = true;
                }
            }
            else {
                if (localStorage.getItem("sonidos") != "false") {
                    this.nativeAudio.play('simple').catch(function () { });
                }
                this.claveActual = "";
            }
            this.contadorJugadas = 0;
            // this.taparJuego=true;
            setTimeout(function () {
                for (var i = 0; i < 16; i++) {
                    if (_this.imgMostrar[i].ok == false) {
                        _this.imgMostrar[i].img = "assets/imgs/beta/ok2.png";
                    }
                    else {
                        _this.imgMostrar[i].img = "assets/imgs/beta/elLogo.png";
                    }
                    _this.taparJuego = false;
                }
                if (_this.gano) {
                    if (!_this.yaJugo) {
                        _this.SubirDescuento();
                        _this.mensaje = "!!Felicitaciones usted ganó un 10% de descuento!!";
                        var usuariosRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios/" + _this.claveJugador);
                        usuariosRef.set(_this.jugadorActual).then(function () {
                            _this.mostrarAlert = true;
                            setTimeout(function () {
                                _this.mostrarAlert = false;
                                _this.navCtrl.pop();
                            }, 4000);
                            clearInterval(_this.x);
                            _this.tiempo = "juego finalizado";
                        });
                    }
                    else {
                        _this.mensaje = "!!Felicitaciones ganó el juego!!";
                        _this.mostrarAlert = true;
                        setTimeout(function () {
                            _this.mostrarAlert = false;
                            _this.navCtrl.pop();
                        }, 4000);
                        clearInterval(_this.x);
                        _this.tiempo = "juego finalizado";
                    }
                }
            }, 500);
        }
    };
    JuegoPage.prototype.ObtenerMesa = function () {
        var _this = this;
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            var esValido = true;
            for (var key in data) {
                if (data[key].correo == _this.correo) {
                    //Si noo jugo pongo mi variable a false y subo que ya jugo a firebase
                    if (data[key].juegoFacu == undefined) {
                        _this.yaJugo = false;
                        _this.jugadorActual = data[key];
                        _this.jugadorActual.juegoFacu = "si";
                        _this.claveJugador = key;
                    } //Si jugo simplemente le aviso a mi variable local.
                    else {
                        _this.jugadorActual = data[key];
                        _this.jugadorActual.juegoFacu = "si";
                        _this.claveJugador = key;
                        _this.yaJugo = true;
                    }
                    //Siempre va a tener mesa sino sera su correo pero el campo mesa siempre estara seteado asi que tranqui
                    _this.mesa = data[key].mesa;
                }
            }
        }).catch(function () { console.log("Por las dudas"); });
    };
    JuegoPage.prototype.SubirDescuento = function () {
        var desc = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref().child("pedidos/" + this.mesa);
        desc.update({ desc: "10%" });
    };
    JuegoPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    JuegoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-juego',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego\juego.html"*/'<!--\n\n  Generated template for the JuegoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<div class="superAlert"  [ngClass]="{\'mostrarAlert\':mostrarAlert}">\n\n<div class="alert">\n\n  <img  src="assets/imgs/beta/ganador.jpg"  [ngClass]="{\'quitarFoto\':!gano}">\n\n  <h1>{{mensaje}}</h1>\n\n</div>\n\n</div>\n\n\n\n<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="power"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n  <ion-menu [content]="content">\n\n    <ion-header>\n\n      <ion-toolbar color="dark">\n\n        <ion-title>Menú</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content>\n\n      <ion-list>\n\n        <button ion-item>\n\n            <i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Convencional\n\n        </button>\n\n        <button ion-item>\n\n          Friends\n\n        </button>\n\n        <button ion-item>\n\n          Events\n\n        </button>\n\n        <button ion-item >\n\n          Close Menu\n\n        </button>\n\n      </ion-list>\n\n    </ion-content>\n\n  </ion-menu>\n\n\n\n  <ion-nav #content swipeBackEnabled="false"></ion-nav>\n\n\n\n\n\n\n\n<ion-content>\n\n\n\n<div class="taparJuego" [ngClass]="{\'taparJuegoTrue\':taparJuego}"></div>\n\n<div class="iniciarJuego" [ngClass]="{\'iniciarJuegoFalse\':juegoIniciado}">\n\n \n\n  <div class="mensajeInicio">\n\n    <h1>Juego de la memoria</h1>\n\n    <p class="p1">\n\n       Diviertase con este clásico juego de la memoria , y atención que si es la primera véz que juega puede ganar un 10% de descuento.</p>\n\n        <p>¡¡¡Inténtelo!!!</p>\n\n    \n\n    <button ion-button  (click)="Jugar()">Jugar</button>\n\n\n\n</div>\n\n</div>\n\n\n\n  <div class="juego">\n\n    <h2 class="tituloJuego">¡Juego de la memoria!</h2><h3 class="tiempo">{{tiempo}}</h3>\n\n\n\n    <div class="fila1">\n\n      <img [src]="imgMostrar[0].img" [class.animacion]="animacion[0]"  (click)="cambiarImagen(\'1\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[1].img" [class.animacion]="animacion[1]"    (click)="cambiarImagen(\'2\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[2].img" [class.animacion]="animacion[2]"  (click)="cambiarImagen(\'3\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[3].img" [class.animacion]="animacion[3]"  (click)="cambiarImagen(\'4\')"  width="20%" height="90%">\n\n    </div>\n\n    <div class="fila2">\n\n      <img [src]="imgMostrar[4].img" [class.animacion]="animacion[4]"  (click)="cambiarImagen(\'5\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[5].img" [class.animacion]="animacion[5]"  (click)="cambiarImagen(\'6\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[6].img" [class.animacion]="animacion[6]"  (click)="cambiarImagen(\'7\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[7].img" [class.animacion]="animacion[7]"  (click)="cambiarImagen(\'8\')" width="20%" height="90%">\n\n      \n\n    \n\n    </div>\n\n    <div class="fila3">\n\n      <img [src]="imgMostrar[8].img" [class.animacion]="animacion[8]"  (click)="cambiarImagen(\'9\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[9].img"  [class.animacion]="animacion[9]"  (click)="cambiarImagen(\'10\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[10].img" [class.animacion]="animacion[10]"  (click)="cambiarImagen(\'11\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[11].img" [class.animacion]="animacion[11]"  (click)="cambiarImagen(\'12\')" width="20%" height="90%">\n\n    \n\n    </div>\n\n    <div class="fila4">\n\n      <img [src]="imgMostrar[12].img"  [class.animacion]="animacion[12]" (click)="cambiarImagen(\'13\')"width="20%" height="90%">\n\n      <img [src]="imgMostrar[13].img" [class.animacion]="animacion[13]"  (click)="cambiarImagen(\'14\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[14].img" [class.animacion]="animacion[14]"  (click)="cambiarImagen(\'15\')" width="20%" height="90%">\n\n      <img [src]="imgMostrar[15].img"  [class.animacion]="animacion[15]"  (click)="cambiarImagen(\'16\')" width="20%" height="90%">\n\n    \n\n    </div>\n\n    </div>\n\n    \n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego\juego.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], JuegoPage);
    return JuegoPage;
}());

//# sourceMappingURL=juego.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JuegoDosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JuegoDosPage = /** @class */ (function () {
    function JuegoDosPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.puntajeMaximo = 0;
        this.primeraVezJugando = 0;
        this.meta = 3;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.firebase = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a;
        this.puedeGanarBebida = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        var usuariosRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    _this.usuarioKey = item;
                    _this.usuarioMesa = data[item].mesa;
                    if (data[item].juegoAxel) {
                        _this.puedeGanarBebida = false;
                    }
                }
            }
        });
        this.getNewQuestion();
    }
    JuegoDosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JuegoDosPage');
    };
    JuegoDosPage.prototype.Timer = function () {
        var _this = this;
        this.asd = setInterval(function () {
            _this.segundos--;
            if (_this.segundos == 0) {
                _this.MostrarAlert("¡Perdió!", "Se le acabó el tiempo para responder.", "Aceptar", _this.limpiar);
                __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios").child(_this.usuarioKey).update({ juegoAxel: true });
                //alert("Se acabo el tiempo");
                clearInterval(_this.asd);
                _this.navCtrl.pop();
            }
        }, 1000);
    };
    JuegoDosPage.prototype.getNewQuestion = function () {
        if (this.primeraVezJugando == 0) {
            this.Timer();
        }
        this.segundos = 15;
        this.operador = Math.floor(Math.random() * (4 - 1)) + 1;
        this.n1 = Math.floor(Math.random() * (50 - 1)) + 1;
        this.n2 = Math.floor(Math.random() * (50 - 1)) + 1;
        switch (this.operador) {
            case 1:
                this.question = this.n1 + " + " + this.n2 + " = ";
                this.answer = this.n1 + this.n2;
                break;
            case 2:
                this.question = this.n1 + " - " + this.n2 + " = ";
                this.answer = this.n1 - this.n2;
                break;
            case 3:
                this.n1 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
                this.n2 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
                this.question = this.n1 + " X " + this.n2 + " = ";
                this.answer = this.n1 * this.n2;
                break;
            default:
        }
    };
    JuegoDosPage.prototype.onSubmitAnswer = function () {
        var _this = this;
        if (!this.userAnswer) {
            //alert("No escribio ninguna respuesta");
            this.MostrarAlert("¡Error!", "No escribió ninguna respuesta.", "Aceptar", this.limpiar);
            return;
        }
        if (parseInt(this.userAnswer) == this.answer) {
            //alert("respuesta correcta");
            this.MostrarAlert("¡Respuesta correcta!", "Tiene que acertar 3 veces.", "Aceptar", this.limpiar);
            this.userAnswer = "";
            this.puntajeMaximo++;
            this.primeraVezJugando++;
            this.getNewQuestion();
            if (this.puntajeMaximo == this.meta) {
                //alert("Enhorabuena,usted gano el juego");
                //this.MostrarAlert("Gano!!", "Se gano su bebida gratis", "Aceptar", this.limpiar);
                this.question == "";
                this.segundos == 0;
                clearInterval(this.asd);
                if (this.puedeGanarBebida) {
                    this.estadoBoton = true;
                    //this.ocultarSpinner = false;
                    this.MostrarAlert("¡Ganaste!", "¡Tu bebida gratis aguarda!", "Volver", this.limpiar);
                    __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true }).then(function () {
                        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").push({
                            cantidad: 1,
                            nombre: "bebida gratuita",
                            precio: 0
                        }).then(function () {
                            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("pedidos").child(_this.usuarioMesa).child("cocinero").update({ estado: "tomado" }).then(function () {
                                _this.estadoBoton = false;
                                // this.ocultarSpinner = true;
                                //this.navCtrl.pop();
                            });
                        });
                    });
                }
                else {
                    this.MostrarAlert("¡Ganaste!", "", "Volver", this.limpiar);
                    this.navCtrl.pop();
                }
            }
        }
        else {
            //alert("respuesta incorrecta");
            this.MostrarAlert("¡Perdió!", "¡Escribió un número incorrecto.", "Aceptar", this.limpiar);
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios").child(this.usuarioKey).update({ juegoAxel: true });
            clearInterval(this.asd);
            this.navCtrl.pop();
        }
    };
    JuegoDosPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    JuegoDosPage.prototype.limpiar = function () {
        this.ocultarAlert = true;
    };
    JuegoDosPage.prototype.volver = function () {
        clearInterval(this.asd);
        this.navCtrl.pop();
    };
    JuegoDosPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    JuegoDosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-juego-dos',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego-dos\juego-dos.html"*/'<!--\n\n  Generated template for the JuegoQuinterosPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar color="dark" hideBackButton="true">\n\n      <ion-title class="titulo2">\n\n        {{usuario.tipo}}\n\n      </ion-title>\n\n\n\n      <ion-buttons start style="left: 3px;\n\n          position: absolute;">\n\n          <button ion-button (click)="volver()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n         </button>\n\n        </ion-buttons>\n\n\n\n\n\n\n\n  \n\n      <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n\n\n       \n\n        <button ion-button (click)="Logout()">\n\n          <ion-icon name="close"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  \n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n               \n\n                  \n\n                   \n\n\n\n           \n\n\n\n\n\n\n\n            <div class="container">\n\n\n\n                    \n\n                            \n\n                                    <!--<span style="font-size:30px;padding-left:40px;">Tiempo restante: {{segundos}}</span>-->\n\n\n\n                                    <h2 class="asd">Tiempo restante: {{segundos}}</h2>\n\n\n\n                                    <h4 class="asd" >Acierte 3 veces para ganar</h4>\n\n\n\n                                    <h4 class="asd" >Puntaje: {{puntajeMaximo}}</h4>\n\n\n\n                  \n\n\n\n                                    <!--<p class="question">{{question}}</p>-->\n\n                                    <p style="text-align:center;font-size:70px;background-color:white;border-radius: 70px;">{{question}}</p>\n\n            \n\n                                    <div class="laPregunta5">\n\n\n\n                                    <ion-item>\n\n                                        <ion-input type="text" class="respuestitaa" placeholder="¡Respondé acá!"  [(ngModel)]="userAnswer" ></ion-input>\n\n                                      </ion-item>\n\n\n\n                                    </div>\n\n                                \n\n                                   \n\n                               \n\n                              \n\n                                \n\n                                \n\n                                    <button  class="botonJuego" (click)="onSubmitAnswer()" id="submitbutton">Responder</button>\n\n                               \n\n                         \n\n                                \n\n                          \n\n                \n\n                        \n\n                \n\n                      </div>\n\n\n\n\n\n</ion-content>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n    <div class="alert-message animation-target">\n\n      <h1>{{alertTitulo}}</h1>\n\n      <p>{{alertMensaje}}</p>\n\n      <div class="botones">\n\n  \n\n        <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n      </div>\n\n    </div>\n\n  \n\n  </div>\n\n\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\juego-dos\juego-dos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], JuegoDosPage);
    return JuegoDosPage;
}());

//# sourceMappingURL=juego-dos.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaDeMesaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//NANANANAN MUY CLAVE ESTE COMENTARIOOOOOOOOOOOOOO
//LINEA 288 Y 291 FERNII
/**
 * Generated class for the AltaDeMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AltaDeMesaPage = /** @class */ (function () {
    function AltaDeMesaPage(navCtrl, navParams, authInstance, toastCtrl, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.firebase = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.firestore();
        this.tipo = "normal";
        this.foto = "";
        this.cerrarqr = false;
        this.esValido = false;
        this.estado = "vertical-container";
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        this.foto = "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg";
        this.probandingg = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.mesas = [];
        var mesasRef = this.firebase.database().ref("mesas");
        mesasRef.once("value", function (snap) {
            var data = snap.val();
            for (var a in data) {
                _this.mesas.push(data[a]);
                //console.log(data[a].numeroMesa);
            }
            _this.mesas = _this.mesas.sort(function (a, b) {
                return a.numero - b.numero;
            });
        });
    }
    AltaDeMesaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AltaDeMesaPage');
    };
    AltaDeMesaPage.prototype.Alta = function () {
        var _this = this;
        if (!this.numeroMesa || !this.cantidadComensales || !this.tipo || this.foto == "") {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        //if(this.numeroMesa < 1 || this.numeroMesa > 10)
        if (this.numeroMesa == 1 || this.numeroMesa == 2 || this.numeroMesa == 3 || this.numeroMesa == 4 || this.numeroMesa == 5 || this.numeroMesa == 6 || this.numeroMesa == 7 || this.numeroMesa == 8 || this.numeroMesa == 9 || this.numeroMesa == 10) {
            //this.presentToast("Solo tenemos lugar para 10 mesas en el restaurante")
            //return;
        }
        else {
            this.presentToast("Solo tenemos lugar para mesas del 1 al 10 en el restaurante.");
            return;
        }
        //if(this.cantidadComensales < 1 || this.cantidadComensales > 8)
        if (this.cantidadComensales == 1 || this.cantidadComensales == 2 || this.cantidadComensales == 3 || this.cantidadComensales == 4 || this.cantidadComensales == 5 || this.cantidadComensales == 6 || this.cantidadComensales == 7 || this.cantidadComensales == 8) {
            //this.presentToast("Los comensales solo pueden ser de 1 a 8")
            // return;
        }
        else {
            this.presentToast("Los comensales solo pueden ser de 1 a 8.");
            return;
        }
        /*  let mesasRef = this.firebase.database().ref("mesas");
      
          mesasRef.push({
            numeroMesa: this.numeroMesa,
            cantidadComensales: this.cantidadComensales,
            tipo: this.tipo,
      
      
      
      
      
           
          });*/
        var verMesaRef = this.firebase.database().ref("mesas");
        verMesaRef.once("value", function (snap) {
            var data = snap.val();
            _this.esValido = true;
            for (var item in data) {
                if (data[item].numeroMesa == parseInt(_this.numeroMesa)) {
                    _this.presentToast("Esa mesa ya ha sido registrada.");
                    _this.esValido = false;
                    //break;
                }
            }
            if (_this.foto == "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg" && _this.esValido) {
                var url = "";
                url = "../../assets/imgs/gamma/llama.jpeg";
                var mesasRef = _this.firebase.database().ref("mesas");
                mesasRef.push({
                    numeroMesa: _this.numeroMesa,
                    cantidadComensales: _this.cantidadComensales,
                    tipo: _this.tipo,
                    estado: "libre",
                    img: url
                }).then(function () {
                    _this.numeroMesa = "";
                    _this.cantidadComensales = "";
                    _this.foto = "";
                    _this.presentToast("La mesa fue cargada con éxito.");
                });
                ;
            }
            if (_this.esValido && _this.foto != "http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg") {
                var mesasRef_1 = _this.firebase.database().ref("mesas");
                var pictures_1 = _this.firebase.storage().ref("mesas/" + (_this.nombreFoto + "mesaNumero:" + _this.numeroMesa));
                pictures_1.putString(_this.foto, "data_url").then(function () {
                    pictures_1.getDownloadURL().then(function (url) {
                        mesasRef_1.push({
                            numeroMesa: _this.numeroMesa,
                            cantidadComensales: _this.cantidadComensales,
                            tipo: _this.tipo,
                            estado: "libre",
                            img: url
                        }).then(function () {
                            _this.numeroMesa = "";
                            _this.cantidadComensales = "";
                            _this.foto = "";
                        });
                        ;
                    });
                });
            }
        });
        /* if (this.esValido) {
               let mesasRef = this.firebase.database().ref("mesas");
     
     
               let pictures = this.firebase.storage().ref(`mesas/${this.nombreFoto+"mesaNumero:"+this.numeroMesa}`);
     
               pictures.putString(this.foto, "data_url").then(() => {
     
                 pictures.getDownloadURL().then((url) => {
     
                   mesasRef.push({
                     numeroMesa: this.numeroMesa,
                     cantidadComensales: this.cantidadComensales,
                     tipo: this.tipo,
                     estado: "libre",
                     img: url
                   }).then(() =>
                   {
                    
                     this.numeroMesa="";
                     this.cantidadComensales="";
                     this.foto="";
                   });;
     
                   
                 });
     
     
     
     
               });
     
     
               
     
         
             }*/
    };
    AltaDeMesaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    AltaDeMesaPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, nombreFoto, options, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        this.foto = "data:image/jpeg;base64," + result;
                        this.nombreFoto = nombreFoto;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AltaDeMesaPage.prototype.Leer = function () {
        /*
       
    this.cerrarqr=true;
    this.probandingg=false;
    
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
    
      if (status.authorized) {
    
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
    
         
          alert(text);
         
          
    
          this.estado = "vertical-container";
        });
    
        this.qrScanner.show().then(() => {
    
          (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
          (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
          (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
          this.estado = "ocultar";
        });
    
      } else if (status.denied) {
       
    
      } else {
       
      }
    })
    .catch((e: any) => this.presentToast(e));
    
    */
    };
    AltaDeMesaPage.prototype.OcultarLectorQR = function () {
        /*
    
        this.qrScanner.hide().then(() => {
    
          (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
          (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
          
          this.estado = "vertical-container";
          this.probandingg=true;
          this.cerrarqr=false;
        });
    
        this.scanSub.unsubscribe();
        */
    };
    AltaDeMesaPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    AltaDeMesaPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    AltaDeMesaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-alta-de-mesa',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-de-mesa\alta-de-mesa.html"*/'<!--\n\n  Generated template for the AltaDeMesaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>altaDeMesa</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>-->\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>altaDeMesa</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>-->\n\n\n\n\n\n<!--<ion-content padding>\n\n\n\n    <ion-label>Tipo</ion-label>\n\n    <ion-select value=Regular>\n\n      <ion-option value="Vip">Vip</ion-option>\n\n      <ion-option value="Discapacitados">Discapacitados</ion-option>\n\n      <ion-option value="Regular">Regular</ion-option>\n\n    </ion-select>\n\n\n\n</ion-content>-->\n\n\n\n<!--<ion-content >\n\n    <ion-row >\n\n   \n\n      <ion-col>\n\n        \n\n        <img src="assets/imgs/gamma/mesas.jpg"/>\n\n      </ion-col>\n\n    \n\n    </ion-row>\n\n    <div >\n\n      <form >\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-list inset>\n\n              \n\n              <ion-item>\n\n                <ion-input type="text" placeholder="Numero de mesa" name="email" ></ion-input>\n\n              </ion-item>\n\n              \n\n              <ion-item>\n\n                <ion-input type="password" placeholder="Cantidad de comensales" name="password"></ion-input>\n\n              </ion-item>\n\n\n\n              <ion-item>\n\n                  <ion-input type="password" placeholder="Tipo" name="password"></ion-input>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                    <ion-input type="file" [id]="pic"></ion-input>\n\n                  </ion-item>\n\n              \n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n        \n\n        <ion-row>\n\n          <ion-col class="signup-col">\n\n\n\n\n\n            <button ion-button class="submit-btn"  >Dar de alta la mesa</button>\n\n\n\n            <button ion-button class="submit-btn"  >Lector de codigo qr de la mesa</button>\n\n            \n\n          </ion-col>\n\n        </ion-row>\n\n        \n\n      </form>\n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          \n\n          \n\n          \n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n    </div>\n\n  </ion-content>-->\n\n\n\n <!-- <ion-header>\n\n      <ion-navbar color="red">\n\n    \n\n        <ion-buttons>\n\n          <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n        <ion-buttons end>\n\n          <button ion-button>\n\n            <ion-icon name="power"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n      </ion-navbar>\n\n    </ion-header>\n\n    \n\n      <ion-menu [content]="content">\n\n        <ion-header>\n\n          <ion-toolbar color="red">\n\n            <ion-title>Menú</ion-title>\n\n          </ion-toolbar>\n\n        </ion-header>\n\n        <ion-content>\n\n          <ion-list>\n\n            <button ion-item>\n\n                <i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Convencional\n\n            </button>\n\n            <button ion-item>\n\n              Friends\n\n            </button>\n\n            <button ion-item>\n\n              Events\n\n            </button>\n\n            <button ion-item>\n\n              Close Menu\n\n            </button>\n\n          </ion-list>\n\n        </ion-content>\n\n      </ion-menu>\n\n    \n\n      <ion-nav #content swipeBackEnabled="false"></ion-nav>-->\n\n\n\n      <ion-header>\n\n        <ion-navbar color="dark" hideBackButton="true">\n\n          <!-- <ion-title class="titulo">\n\n            {{usuario.tipo}}\n\n          </ion-title> -->\n\n\n\n          <ion-buttons start style="left: 3px;\n\n          position: absolute;">\n\n          <button ion-button (click)="volver()">\n\n        <ion-icon name="arrow-dropleft"></ion-icon>\n\n         </button>\n\n        </ion-buttons>\n\n\n\n          \n\n      \n\n          <ion-buttons end>\n\n\n\n           \n\n            <button ion-button (click)="Logout()">\n\n              <ion-icon name="close"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n      \n\n        </ion-navbar>\n\n      </ion-header>\n\n\n\n      <ion-content class ="content" *ngIf="probandingg">\n\n          <ion-row >\n\n         \n\n            <ion-col>\n\n              \n\n            <!--  <img src="assets/imgs/gamma/mesas.jpg"/>-->\n\n\n\n              <!--<h1>Listado de mesas en restaurante</h1>-->\n\n\n\n              <ion-list-header style="background-color:#2f2f2f">\n\n                <div class="realizarEncuesta">Mesas en el restaurante</div>\n\n              </ion-list-header>\n\n\n\n            <div class="mesas">\n\n              <button ion-button color="red" class="mesa" *ngFor="let item of mesas">{{item.numeroMesa}}</button>\n\n            </div>\n\n          \n\n              \n\n            </ion-col>\n\n          \n\n          </ion-row>\n\n          <div >\n\n            \n\n              <ion-row>\n\n                <ion-col>\n\n                  <ion-list inset>\n\n                    \n\n                    <ion-item>\n\n                      <ion-input type="text" class="numeroMesa" placeholder="Número de mesa" name="email" [(ngModel)]="numeroMesa" ></ion-input>\n\n                    </ion-item>\n\n                    \n\n                    <ion-item>\n\n                      <ion-input type="text" class="cantidadComensales"  placeholder="Cantidad de comensales" name="password" [(ngModel)]="cantidadComensales"></ion-input>\n\n                    </ion-item>\n\n      \n\n                  \n\n\n\n                      <select [(ngModel)]="tipo" style="margin: 0 30px 0 0;width: 70%;display: block;\n\n                      margin: 0 auto;">\n\n                       <option value="normal">Tipo de mesa normal</option>\n\n                        <option value="vip">Tipo de mesa VIP</option>\n\n                        <option value="discapacitados">Tipo de mesa discapacitados</option>\n\n                        \n\n                        \n\n                      </select>\n\n      \n\n                      <!--<ion-item>-->\n\n                       \n\n\n\n                        <img [src]="foto" alt="">\n\n                       <!--ion-button outline color="red"-->\n\n\n\n                        \n\n                     <!--   </ion-item>-->\n\n                    \n\n                  </ion-list>\n\n                </ion-col>\n\n              </ion-row>\n\n              \n\n              <ion-row>\n\n                <ion-col class="signup-col">\n\n\n\n                    <button ion-button outline color="red" class="sacarFoto" (click)="SacarFoto()">Sacar\n\n                        foto</button>\n\n      \n\n      \n\n                  <button ion-button color="red" class="botonAlta" (click)="Alta()" >Dar de alta la mesa</button>\n\n      \n\n                 <!-- <button ion-button class="submit-btn" color="red" class="botonLeerQr" (click)="Leer()" >Lector de codigo qr de la mesa</button>-->\n\n                  \n\n                </ion-col>\n\n              </ion-row>\n\n              \n\n           \n\n            <ion-row>\n\n              <ion-col class="signup-col">\n\n                \n\n                \n\n                \n\n              </ion-col>\n\n            </ion-row>\n\n            \n\n          </div>\n\n\n\n         <!-- <button ion-button color="red" class="close" (click)="OcultarLectorQR()">\n\n            <ion-icon name="close"></ion-icon>\n\n          </button>-->\n\n\n\n          \n\n\n\n\n\n\n\n          \n\n\n\n        </ion-content>\n\n\n\n        <!--<ion-header>\n\n            <ion-toolbar   color="haderColor">\n\n              <ion-title>\n\n                QR Tarayıcı\n\n              </ion-title>\n\n              <ion-buttons start>\n\n                <button ion-button (tap)="dismiss()">\n\n                  <span ion-text color="white" showWhen="ios">Kapat</span>\n\n                  <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n\n                </button>\n\n              </ion-buttons>\n\n            </ion-toolbar>\n\n          </ion-header>\n\n          \n\n          \n\n            <ion-content class="content" scroll="true" overflow-scroll="true">\n\n              <button class="button" ion-button (click)="Leer()">qrscanner</button>\n\n            </ion-content>-->\n\n\n\n            <ion-footer *ngIf="cerrarqr">\n\n              <ion-toolbar>\n\n                <ion-title>Footer</ion-title>\n\n                <button ion-button color="red" class="close" (click)="OcultarLectorQR()">\n\n                  <ion-icon name="close"></ion-icon>\n\n                </button>\n\n              </ion-toolbar>\n\n            </ion-footer>\n\n\n\n\n\n            \n\n\n\n\n\n\n\n        \n\n\n\n    \n\n\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-de-mesa\alta-de-mesa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */]])
    ], AltaDeMesaPage);
    return AltaDeMesaPage;
}());

//# sourceMappingURL=alta-de-mesa.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrDeLaMesaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__encuesta_de_empleado_encuesta_de_empleado__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//LINEA 698 Y 701
/**
 * Generated class for the QrDeLaMesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QrDeLaMesaPage = /** @class */ (function () {
    function QrDeLaMesaPage(navCtrl, navParams, toastCtrl, authInstance, barcode) {
        /* this.qrScanner.prepare()
     .then((status: QRScannerStatus) => {

       if (status.authorized) {

         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

         
           alert(text);
          
         });

         this.qrScanner.show().then(() => {

           (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
           (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
           (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
         
         });

       } else if (status.denied) {
         

       } else {
        
       }
     })
     .catch((e: any) => this.presentToast(e));

*/
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.authInstance = authInstance;
        this.barcode = barcode;
        this.user_data = [];
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.firebaseDos = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.firestore();
        this.cerrarqr = false;
        this.probandingg = true;
        this.estaLibre = false;
        this.ocultarQR = false;
        this.estaOcupada = false;
        this.pedidos = false;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.moment = __WEBPACK_IMPORTED_MODULE_7_moment__;
        //this.vistaCliente=true;
        //this.usuario.tipo="cliente";
        //this.vistaMozo=true;
        // this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.sinPersonasEnEspera = false;
        this.sinPersonasAtendidas = false;
        this.sinPedidosParaEntregar = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "mozo") {
            this.vistaMozo = true;
        }
        if (this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {
            this.vistaCliente = true;
        }
        setInterval(function () {
            if (_this.ocultarQR) {
                _this.OcultarLectorQR();
                _this.ocultarQR = false;
            }
        }, 500);
        /*  let pedidosRef = this.firebase.database().ref("usuarios");
      
          pedidosRef.once("value", (snap) => {
      
            //let data = snap.val();
           // let esValido = true;
           let result = snap.val();
          for(let k in result){ //"k" provides key Id of each object
            this.user_data.push({
             id : k,
             apellido : result[k].apellido,
             clave : result[k].clave,
             correo : result[k].correo,
             cuil : result[k].cuil,
             dni : result[k].dni,
             nombre : result[k].nombre,
             tipo : result[k].tipo
           });
          }
      
      
      
            
          });*/
        this.estaLibre = false;
        this.usuarios = [];
        this.espera = [];
        this.atendidos = [];
        this.pedidosPruebaUno = [];
        this.pedidosPruebaDos = [];
        this.pedidosPruebaTres = [];
        this.pedidosPruebaCuatro = [];
        this.pedidosPruebaCinco = [];
        this.pedidosPruebaSeis = [];
        this.pedidosPruebaSiete = [];
        this.pedidosPruebaOcho = [];
        this.pedidosPruebaNueve = [];
        this.pedidosPruebaDiez = [];
        //let genteRef = this.firebase.database().ref("usuarios/clientes");
        /* let genteRef = this.firebase.database().ref("usuarios");
     
         genteRef.once("value", (snap) => {
     
           let data = snap.val();
     
           for (let item in data) {
     
             this.usuarios.push(data[item]);
           }
     
           console.log(this.usuarios);
         }).then(() => {
           this.espera = this.usuarios.filter(item => {
     
             
             return item.estado=="espera";
           });
     
           this.atendidos = this.usuarios.filter(item => {
     
            
            return item.estado=="atendido";
           });
     
     
           
     
         });*/
        var genteRef = this.firebase.database().ref("usuarios");
        genteRef.on("value", function (snap) {
            _this.usuarios = [];
            _this.sinPersonasEnEspera = false;
            _this.sinPersonasAtendidas = false;
            console.log("asd");
            var data = snap.val();
            for (var item in data) {
                _this.usuarios.push(data[item]);
            }
            _this.espera = _this.usuarios.filter(function (item) {
                if (item.estado == "espera") {
                    _this.sinPersonasEnEspera = true;
                }
                //console.log("aca estoy");
                return item.estado == "espera";
            });
            _this.atendidos = _this.usuarios.filter(function (item) {
                if (item.estado == "atendido") {
                    _this.sinPersonasAtendidas = true;
                }
                return item.estado == "atendido";
            });
            console.log(_this.usuarios);
        });
        var pedidosProbandoUno = this.firebase.database().ref("pedidos/1");
        pedidosProbandoUno.on("value", function (snap) {
            _this.pedidosPruebaUno = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaUno.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaUno.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoDos = this.firebase.database().ref("pedidos/2");
        pedidosProbandoDos.on("value", function (snap) {
            _this.pedidosPruebaDos = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaDos.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDos.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoTres = this.firebase.database().ref("pedidos/3");
        pedidosProbandoTres.on("value", function (snap) {
            _this.pedidosPruebaTres = [];
            //this.pedidosPruebaTres=new Array(0);
            _this.sinPedidosParaEntregar = false;
            var vale = 0;
            var terminado = true;
            var cocinero = false;
            var bartender = false;
            var terminadisimo = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    /*vale++;
                    if(vale==2)
                    {
                      this.pedidosPruebaTres.push(result[k]);
                    }*/
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaTres.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaTres.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoCuatro = this.firebase.database().ref("pedidos/4");
        pedidosProbandoCuatro.on("value", function (snap) {
            _this.pedidosPruebaCuatro = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var cocinero = false;
            var bartender = false;
            var terminadisimo = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaCuatro.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCuatro.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoCinco = this.firebase.database().ref("pedidos/5");
        pedidosProbandoCinco.on("value", function (snap) {
            _this.pedidosPruebaCinco = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaCinco.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaCinco.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoSeis = this.firebase.database().ref("pedidos/6");
        pedidosProbandoSeis.on("value", function (snap) {
            _this.pedidosPruebaSeis = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaSeis.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSeis.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoSiete = this.firebase.database().ref("pedidos/7");
        pedidosProbandoSiete.on("value", function (snap) {
            _this.pedidosPruebaSiete = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaSiete.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaSiete.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoOcho = this.firebase.database().ref("pedidos/8");
        pedidosProbandoOcho.on("value", function (snap) {
            _this.pedidosPruebaOcho = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaOcho.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaOcho.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoNueve = this.firebase.database().ref("pedidos/9");
        pedidosProbandoNueve.on("value", function (snap) {
            _this.pedidosPruebaNueve = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaNueve.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaNueve.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
        var pedidosProbandoDiez = this.firebase.database().ref("pedidos/10");
        pedidosProbandoDiez.on("value", function (snap) {
            _this.pedidosPruebaDiez = [];
            var vale = 0;
            _this.sinPedidosParaEntregar = false;
            var terminadisimo = false;
            var cocinero = false;
            var bartender = false;
            var result = snap.val();
            for (var k in result) {
                if (k == "cocinero") {
                    cocinero = true;
                }
                if (k == "bartender") {
                    bartender = true;
                }
                if (result[k].estado == "terminado") {
                    terminadisimo = true;
                }
            }
            for (var k in result) {
                if (result[k].estado == "preparacion") {
                    vale++;
                    if (terminadisimo == true) {
                        _this.pedidosPruebaDiez.push(result[k]);
                        console.log("los 2,uno terminado y el otro añadido");
                        _this.sinPedidosParaEntregar = true;
                        break;
                    }
                    if (bartender == true && cocinero == true) {
                        if (vale == 2) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("los 2");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (bartender == true && cocinero == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("barteneder");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                    if (cocinero == true && bartender == false) {
                        if (vale == 1) {
                            _this.pedidosPruebaDiez.push(result[k]);
                            console.log("cocinero");
                            _this.sinPedidosParaEntregar = true;
                            break;
                        }
                    }
                }
            }
        });
    }
    QrDeLaMesaPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    QrDeLaMesaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QrDeLaMesaPage');
    };
    QrDeLaMesaPage.prototype.MostrarQr = function (correo) {
        /* this.cerrarqr=true;
         this.probandingg=false;

         this.qrScanner.prepare()
         .then((status: QRScannerStatus) => {
           .then((status) => {

           if (status.authorized) {

             this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

            
                 alert(text);
                 this.Modificar(correo,text);
                 this.ocultarQR = true;

          
             });

             this.qrScanner.show().then(() => {

               (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
               (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
               (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
               //this.estado = "ocultar";
             });

           } else if (status.denied) {
          

           } else {
             
           }
         })
         .catch((e: any) => this.presentToast(e));
*/
    };
    QrDeLaMesaPage.prototype.OcultarLectorQR = function () {
        /*
            this.qrScanner.hide().then(() => {
        
              (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
              (window.document.querySelector('.close') as HTMLElement).classList.remove('mostrar');
              
              this.probandingg=true;
              this.cerrarqr=false;
            });
        
            this.scanSub.unsubscribe();*/
    };
    QrDeLaMesaPage.prototype.Modificar = function (correo, text, cantidad, mesa) {
        var _this = this;
        var ocup = true;
        this.estaLibre = true;
        var momentoActual = __WEBPACK_IMPORTED_MODULE_7_moment__(new Date());
        var reservasRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas");
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].mesa == text) {
                    var diferencia = Math.abs(momentoActual.diff(__WEBPACK_IMPORTED_MODULE_7_moment__(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 40) {
                        if (data[item].correo == correo) {
                            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("usuarios").once("value", function (snapUsuario) {
                                var dataUsuario = snapUsuario.val();
                                for (var itemUsuario in dataUsuario) {
                                    if (dataUsuario[itemUsuario].correo == correo) {
                                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("usuarios").child(itemUsuario).update({ estado: "atendido" }).then(function () {
                                            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("mesas").once("value", function (snapMesa) {
                                                var dataMesa = snapMesa.val();
                                                var _loop_1 = function (itemMesa) {
                                                    if (dataMesa[itemMesa].numeroMesa == mesa) {
                                                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("mesas").child(itemMesa).update({ estado: "ocupada" }).then(function () {
                                                            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("mesas").child(itemMesa).update({ cliente: correo }).then(function () {
                                                                _this.MostrarAlert("", "Se ha asignado la mesa.", "Aceptar", _this.limpiar);
                                                            });
                                                        });
                                                    }
                                                };
                                                for (var itemMesa in dataMesa) {
                                                    _loop_1(itemMesa);
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            //this.presentToast("Esa mesa esta reservada.");
                            _this.MostrarAlert("Error", "Esta mesa está reservada.", "Aceptar", _this.limpiar);
                            //reservadita=true;
                            //otro=2;
                            return;
                        }
                    }
                }
            }
            var refDos = _this.firebase.database().ref("mesas");
            refDos.once('value', function (snap) {
                var data = snap.val();
                var _loop_2 = function () {
                    if (mesa == "1" || mesa == "2" || mesa == "3" || mesa == "4" || mesa == "5" || mesa == "6" || mesa == "7" || mesa == "8" || mesa == "9" || mesa == "10") 
                    //if(mesa=="1")
                    {
                        if (text != mesa) {
                            _this.MostrarAlert("¡Error!", "Este cliente tiene otra mesa reservada.", "Aceptar", _this.limpiar);
                            return "break";
                        }
                    }
                    //agregue esto para ver si valida el que escanea un qr de mesa
                    if (text == "1" || text == "2" || text == "3" || text == "4" || text == "5" || text == "6" || text == "7" || text == "8" || text == "9" || text == "10") {
                    }
                    else {
                        _this.MostrarAlert("¡Error!", "Por favor escanee una mesa valida.", "Aceptar", _this.limpiar);
                        return "break";
                    }
                    if (text == data[key].numeroMesa) {
                        //if(data[key].cliente!=null)
                        //CAMBIE ESTA LINEA
                        if (data[key].estado != "libre") {
                            _this.estaLibre = false;
                            //ocup=false;
                            // alert("La mesa ya esta ocupada");
                            _this.MostrarAlert("Error!", "La mesa ya está ocupada.", "Aceptar", _this.limpiar);
                            return "break";
                            //return;
                        }
                        if (data[key].cantidadComensales < cantidad) {
                            _this.MostrarAlert("Error!", "Esta mesa no soporta esa cantidad de comensales.", "Aceptar", _this.limpiar);
                            return "break";
                        }
                        data[key].cliente = correo;
                        data[key].estado = "ocupada";
                        refDos.child(key).update(data[key]);
                        //alert("bienvenido,se relaciono la mesa tres")
                        if (text == mesa) {
                            var reservasRef_1 = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas");
                            var djActual_1 = __WEBPACK_IMPORTED_MODULE_7_moment__(new Date());
                            reservasRef_1.once("value", function (snap) {
                                var data = snap.val();
                                for (var item in data) {
                                    if (data[item].correo == correo) {
                                        //AGREGANDO LOGIC APRA LA FUNCION
                                        var djReserva = __WEBPACK_IMPORTED_MODULE_7_moment__(data[item].horario, "DD/MM/YYYY HH:mm");
                                        if (djReserva.diff(djActual_1, "m") > -40 && djReserva.diff(djActual_1, "m") < 20) {
                                            //AGREGANDO LOGIC APRA LA FUNCION
                                            data[item].terminada = "si";
                                            reservasRef_1.child(item).update(data[item]);
                                            reservasRef_1.child(item).remove();
                                            break;
                                        }
                                    }
                                }
                            });
                        }
                        //var ref = this.firebase.database().ref("usuarios/clientes");
                        ref = _this.firebase.database().ref("usuarios");
                        ref.once('value', function (snap) {
                            var data = snap.val();
                            for (var key in data) {
                                if (correo == data[key].correo) {
                                    data[key].mesa = text;
                                    data[key].estado = "atendido";
                                    ref.child(key).update(data[key]);
                                    //alert("Listo,se relaciono al cliente con la mesa " + text);
                                    _this.MostrarAlert("Éxito!", "Se relacionó al cliente con la mesa." + text, "Aceptar", _this.limpiar);
                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    //COMENTE ESTO
                                    return;
                                }
                                ;
                            }
                        });
                    }
                    ;
                };
                var ref;
                //this.estaLibre=true;
                // ocup=true;
                for (var key in data) {
                    var state_1 = _loop_2();
                    if (state_1 === "break")
                        break;
                }
            });
        });
        /*var refDos = this.firebase.database().ref("mesas");
                      
                      refDos.once('value', (snap) => {
                          var data = snap.val();
                          //this.estaLibre=true;
                        // ocup=true;
                          for(var key in data)
                          {

                            if(mesa=="1"||mesa=="2"||mesa=="3"||mesa=="4"||mesa=="5"||mesa=="6"||mesa=="7"||mesa=="8"||mesa=="9"||mesa=="10")
                            //if(mesa=="1")
                                {
                                  
                                    if(text!=mesa)
                                    {
                                      this.MostrarAlert("Error!!","Este cliente tiene una reserva para otra mesa","aceptar",this.limpiar);
                                      break;
                                    }

                                }



                              if (text == data[key].numeroMesa)
                              {

                             

                                //if(data[key].cliente!=null)
                                //CAMBIE ESTA LINEA
                                if(data[key].estado!="libre")
                                {

                                  this.estaLibre=false;
                                  //ocup=false;
                                 // alert("La mesa ya esta ocupada");
                                 this.MostrarAlert("Error!", "La mesa ya esta ocupada", "Aceptar", this.limpiar);
                                  break;
                                  //return;
                                  
                                }

                                if(data[key].cantidadComensales<cantidad)
                                {
                                  this.MostrarAlert("Error!", "Esta mesa no soporta esa cantidad de comensales", "Aceptar", this.limpiar);
                                  break;

                                }





                                  data[key].cliente = correo;
                                  data[key].estado = "ocupada";
                                  refDos.child(key).update(data[key]);
                                  //alert("bienvenido,se relaciono la mesa tres")



                                  //var ref = this.firebase.database().ref("usuarios/clientes");
                                  var ref = this.firebase.database().ref("usuarios");
           
                                  ref.once('value', (snap) => {
                                      var data = snap.val();
                                      for(var key in data){
                                          if (correo == data[key].correo) {
                                              data[key].mesa = text;
                                              data[key].estado = "atendido";
                                             
                                              ref.child(key).update(data[key]);
                                              //alert("Listo,se relaciono al cliente con la mesa " + text);
                                              this.MostrarAlert("Exito!", "Listo,se relaciono al cliente con la mesa " + text, "Aceptar", this.limpiar);
                                              this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                              
                                              
                                              
                   
                                          };
                                      }
                                  });





                                 
                              };
                          }
                      }); */
        //if(this.estaLibre)
        //if(ocup==true)
        /*   if(this.estaLibre)
           {

             var ref = this.firebase.database().ref("usuarios/clientes");

             ref.once('value', (snap) => {
                 var data = snap.val();
                 for(var key in data){
                     if (correo == data[key].correo) {
                         data[key].mesa = 3;
                        
                         ref.child(key).update(data[key]);
                         alert("bienvenido,se relaciono al cliente con la mesa " + 3);
                         this.navCtrl.setRoot(this.navCtrl.getActive().component);
                         
                         
                         

                     };
                 }
             });


           }*/
        //this.cargarPersonas();
    };
    QrDeLaMesaPage.prototype.MostrarPedidos = function (mesa) {
        this.pedidos = true;
        var reftres = this.firebase.database().ref("probandopedidos");
        reftres.once('value', function (snap) {
            var data = snap.val();
            for (var key in data) {
                // if ("1" == data[key]) 
                // alert(key);
                if (key == mesa) {
                    alert("El tiempo de espera es " + data[key].tiempo + " minutos");
                    break;
                }
                else {
                    alert("No hicieron ningún pedido todavía.");
                    break;
                }
                // if(parseInt(data[key])==3)
                // {
                //data[key].mesa = 3;
                //ref.child(key).update(data[key]);
                // }                
            }
        });
    };
    QrDeLaMesaPage.prototype.cargarPersonas = function () {
        /*  this.usuarios = [];
          this.espera = [];
          this.atendidos = [];
      
      
          let genteRef = this.firebase.database().ref("usuarios/clientes");
      
          genteRef.once("value", (snap) => {
      
            let data = snap.val();
      
            for (let item in data) {
      
              this.usuarios.push(data[item]);
            }
      
            console.log(this.usuarios);
          }).then(() => {
            this.espera = this.usuarios.filter(item => {
      
              return item.mesa == null;
            });
      
            this.atendidos = this.usuarios.filter(item => {
      
              return item.mesa != null;
            });
      
      
            
      
          });*/
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    QrDeLaMesaPage.prototype.MostrarTiempoEsperaCliente = function () {
        /*
                this.cerrarqr=true;
                  this.probandingg=false;
        
                  this.qrScanner.prepare()
                  //.then((status: QRScannerStatus) => {
                    .then((status) => {
        
                    if (status.authorized) {
        
                      this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
        
                        
                    
                        
        
                          var refDos = this.firebase.database().ref("mesas");
                                
                                refDos.once('value', (snap) => {
                                    var data = snap.val();
                                   
                                    for(var key in data)
                                    {
                                        if (text == data[key].numeroMesa)
                                        {
                                            alert(data[key].tiempoMinimo);
                                            break;
                                                                                                
                                        }
                                      }
                                    });
        
        
        
                         
        
        
        
                          this.ocultarQR = true;
        
                       
                      });
        
                      this.qrScanner.show().then(() => {
        
                        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
                        (window.document.querySelector('.close') as HTMLElement).classList.add('mostrar');
                        (window.document.querySelector('.scroll-content') as HTMLElement).style.backgroundColor = "transparent";
                       
                      });
        
                    } else if (status.denied) {
                   
        
                    } else {
                      
                    }
                  })
                  .catch((e: any) => this.presentToast(e));
        
        
                  */
    };
    QrDeLaMesaPage.prototype.probandoBarcode = function (correo) {
        /*  this.options = { prompt : "Escaneá tu DNI", formats: "PDF_417" }
      
          this.barcode.scan(this.options).then((barcodeData) => {
              this.miScan = (barcodeData.text);
              alert(this.miScan);
          }, (error) => {
             
          });*/
        /* this.barcode.scan().then(barcodeData => {
           this.Modificar(correo,barcodeData.text);
             alert(barcodeData.text);
         });*/
    };
    QrDeLaMesaPage.prototype.ocuparMesaBarcode = function (correo, cantidad, mesa) {
        var _this = this;
        this.barcode.scan().then(function (barcodeData) {
            _this.Modificar(correo, barcodeData.text, cantidad, mesa);
            //alert(barcodeData.text);
        });
    };
    QrDeLaMesaPage.prototype.mostrarTiempoBarcode = function () {
        var _this = this;
        var banderita = 0;
        var comiendo = false;
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        this.barcode.scan().then(function (barcodeData) {
            var refComiendo = _this.firebase.database().ref("usuarios");
            refComiendo.once('value', function (snap) {
                var dataDos = snap.val();
                for (var keyDos in dataDos) {
                    //agregue esto para ver si funciona tambien
                    if (barcodeData.text == "1" || barcodeData.text == "2" || barcodeData.text == "3" || barcodeData.text == "4" || barcodeData.text == "5" || barcodeData.text == "6" || barcodeData.text == "7" || barcodeData.text == "8" || barcodeData.text == "9" || barcodeData.text == "10") {
                    }
                    else {
                        _this.MostrarAlert("¡Error!", "Por favor escanee una mesa valida.", "Aceptar", _this.limpiar);
                        break;
                    }
                    if (dataDos[keyDos].estado == "comiendo" && dataDos[keyDos].correo == usuario.correo && dataDos[keyDos].mesa == barcodeData.text) 
                    //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa==barcodeData.text)
                    {
                        _this.MostrarAlert("Terminado y entregado", "Su pedido ya debería estar en la mesa. Si no es así, comuniquese con su mozo.", "Aceptar", _this.limpiar);
                        banderita = 1;
                        comiendo = true;
                        break;
                    }
                    if (dataDos[keyDos].estado == "comiendo" && dataDos[keyDos].correo == usuario.correo && dataDos[keyDos].mesa != barcodeData.text) 
                    //if(dataDos[keyDos].estado=="comiendo" && dataDos[keyDos].correo=="cliente@gmail.com" && dataDos[keyDos].mesa!=barcodeData.text)
                    {
                        _this.MostrarAlert("Error!!", "Por favor escanee su mesa", "Aceptar", _this.limpiar);
                        banderita = 1;
                        comiendo = true;
                        break;
                    }
                }
            });
            //alert(barcodeData.text);
            var refDos = _this.firebase.database().ref("mesas");
            refDos.once('value', function (snap) {
                var data = snap.val();
                for (var key in data) {
                    //if (barcodeData.text == data[key].numeroMesa)
                    if (barcodeData.text == data[key].numeroMesa) {
                        if (data[key].cliente == usuario.correo) {
                            if (data[key].tiempoMinimo != null) {
                                //alert("El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos");
                                if (comiendo == false) {
                                    _this.MostrarAlert("¡Cocinándose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", _this.limpiar);
                                    banderita = 1;
                                }
                                //this.MostrarAlert("¡Cocinandose!", "El tiempo de su pedido es de " + data[key].tiempoMinimo + " minutos", "Aceptar", this.limpiar);
                                //banderita=1;
                                break;
                            }
                            else {
                                //alert("Su pedido fue tomado,falta que el cocinero ponga un tiempo minimo");
                                _this.MostrarAlert("¡A esperar!", "Su pedido fue tomado, falta que el cocinero ponga un tiempo mínimo.", "Aceptar", _this.limpiar);
                                banderita = 1;
                                break;
                            }
                        }
                        else {
                            //alert("Esa no es su mesa");
                            _this.MostrarAlert("¡Error!", "Esta no es su mesa.", "Aceptar", _this.limpiar);
                            banderita = 1;
                            break;
                        }
                    }
                }
            }).then(function () {
                if (banderita == 0) {
                    //alert("Por favor escanee una mesa valida");
                    _this.MostrarAlert("¡Error!", "Por favor escanee una mesa válida.", "Aceptar", _this.limpiar);
                }
            });
        });
    };
    QrDeLaMesaPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    QrDeLaMesaPage.prototype.limpiar = function () {
        this.ocultarAlert = true;
    };
    QrDeLaMesaPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            localStorage.setItem("desloguear", "true");
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoUno = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaUno = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoDos = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/2/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaDos = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoTres = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/3/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaTres = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoCuatro = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/4/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaCuatro = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoCinco = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/5/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaCinco = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoSeis = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/6/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaSeis = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoSiete = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/7/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaSiete = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoOcho = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/8/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaOcho = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoNueve = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/9/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaNueve = [];
        });
    };
    QrDeLaMesaPage.prototype.terminarPedidoDiez = function () {
        var _this = this;
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/10/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero" || k == "bartender") {
                    data[k].estado = "terminado";
                    refTerminarUnoCocinero.child(k).update(data[k]);
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
            _this.pedidosPruebaDiez = [];
        });
    };
    QrDeLaMesaPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    QrDeLaMesaPage.prototype.prueba = function (text) {
        var _this = this;
        var momentoActual = __WEBPACK_IMPORTED_MODULE_7_moment__(new Date());
        var reservasRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("reservas");
        reservasRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].mesa == text) {
                    var diferencia = Math.abs(momentoActual.diff(__WEBPACK_IMPORTED_MODULE_7_moment__(data[item].horario, "DD/MM/YYYY HH:mm"), "m"));
                    if (diferencia < 40) {
                        //this.presentToast("Esa mesa esta reservada.");
                        _this.MostrarAlert("¡Error!", "Esta mesa está reservada.", "Aceptar", _this.limpiar);
                        return true;
                    }
                }
            }
            return false;
        });
    };
    QrDeLaMesaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-qr-de-la-mesa',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\qr-de-la-mesa\qr-de-la-mesa.html"*/'<!--\n\n  Generated template for the QrDeLaMesaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>qrDeLaMesa</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>-->\n\n\n\n<ion-header>\n\n  <ion-navbar color="dark" hideBackButton="true">\n\n    <!-- <ion-title class="titulo2">\n\n      {{usuario.tipo}}\n\n    </ion-title> -->\n\n\n\n    <ion-buttons start style="left: 3px;\n\n          position: absolute;">\n\n          <button ion-button (click)="volver()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n         </button>\n\n        </ion-buttons>\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n\n\n\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n\n\n     \n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n    <ion-content padding class="home">\n\n     <!--   <div class="center">\n\n          <ion-row>\n\n            <h1>Mesa:</h1>\n\n          </ion-row>\n\n          \n\n        </div>\n\n        <div class="center button">\n\n          <button ion-button class="submit-btn" >Relacionar cliente con mesa</button>\n\n        </div>\n\n\n\n        <div class="center button">\n\n          <button ion-button class="submit-btn" >Ver estado de pedido</button>\n\n        </div>\n\n\n\n        <div class="center button">\n\n          <button ion-button class="submit-btn" >Acceder a encuesta de satisfaccion</button>\n\n        </div>-->\n\n        \n\n      </ion-content>\n\n\n\n      <ion-content  *ngIf="probandingg">\n\n\n\n         \n\n\n\n             <!-- <div class="asdasd3" *ngIf="!sinPedidosParaEntregar">\n\n                  SIN PEDIDOS TERMINADOS\n\n                </div>-->\n\n\n\n         <div *ngIf="vistaMozo">\n\n\n\n            <div class="asdasd" *ngIf="!sinPersonasEnEspera">\n\n                SIN PERSONAS EN ESPERA\n\n              </div>\n\n  \n\n              <div class="asdasd2" *ngIf="!sinPersonasAtendidas">\n\n                  SIN PERSONAS ATENDIDAS\n\n                </div>\n\n\n\n         \n\n\n\n\n\n        <div *ngIf="sinPersonasEnEspera">\n\n\n\n      <h2 class="titulo">Lista de personas en espera</h2>\n\n\n\n    </div>\n\n\n\n\n\n      <ion-list>\n\n\n\n        <ion-item *ngFor="let item of espera">\n\n          <ion-thumbnail item-start>\n\n            <!--<img src={{item.img}}>-->\n\n            <ion-icon name="person"></ion-icon>\n\n          </ion-thumbnail>\n\n    \n\n         <!-- <h1>{{item.apellido}}, {{item.clave}}</h1>\n\n          <p>Empleado • {{item.tipo}}</p>\n\n          <p>CUIL • {{item.cuil}}</p>-->\n\n\n\n          <h1 style="color:black;">{{item.nombre}}</h1>\n\n          <p style="color:black;">Tipo: • {{item.tipo}}</p>\n\n          <p style="color:black;">Cantidad de personas: • {{item.comensales}} </p>\n\n          <p style="color:black;">Mesa: • {{item.mesa}} </p>\n\n         \n\n    \n\n          <!--<button ion-button clear item-end (click)="MostrarQr(item.correo)">-->\n\n              <button ion-button clear item-end (click)="ocuparMesaBarcode(item.correo,item.comensales,item.mesa)">\n\n            <ion-icon name="expand"></ion-icon>\n\n          </button>\n\n        </ion-item>\n\n    \n\n      </ion-list>\n\n\n\n      <div *ngIf="sinPersonasAtendidas">\n\n\n\n      <h2 class="titulo">Lista de personas atendidas</h2>\n\n\n\n      </div>\n\n\n\n      <ion-list>\n\n\n\n        <ion-item *ngFor="let item of atendidos">\n\n          <ion-thumbnail item-start>\n\n            <!--<img src={{item.img}}>-->\n\n            <ion-icon name="people"></ion-icon>\n\n          </ion-thumbnail>\n\n    \n\n        <!--  <h1>{{item.apellido}}, {{item.clave}}</h1>\n\n          <p>Empleado • {{item.tipo}}</p>\n\n          <p>CUIL • {{item.cuil}}</p>-->\n\n\n\n          <h1 style="color:black;"> {{item.nombre}}</h1>\n\n          <p  style="color:black;">Tipo: • {{item.tipo}}</p>\n\n    \n\n         <!-- <button ion-button clear item-end (click)="MostrarPedidos(item.mesa)">-->\n\n            <!--<button ion-button clear item-end (click)="probandoBarcode()">\n\n            <ion-icon name="restaurant"></ion-icon>\n\n          </button>-->\n\n        </ion-item>\n\n    \n\n      </ion-list>\n\n\n\n   <!--   <div *ngIf="sinPedidosParaEntregar">-->\n\n\n\n      <h2 class="titulo">Lista de pedidos para entregar</h2>\n\n\n\n    <!--</div>-->\n\n\n\n      <ion-list>\n\n\n\n        <ion-item *ngFor="let item of pedidosPruebaUno">\n\n          <ion-thumbnail item-start>\n\n           \n\n            <ion-icon name="people"></ion-icon>\n\n          </ion-thumbnail>\n\n\n\n          <button ion-button clear item-end (click)="terminarPedidoUno()">\n\n        \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n    \n\n\n\n          <h1 style="color:black;">Mesa uno</h1>\n\n   \n\n        </ion-item>\n\n\n\n        </ion-list>\n\n\n\n        <ion-list>\n\n\n\n        <ion-item *ngFor="let item of pedidosPruebaDos">\n\n            <ion-thumbnail item-start>\n\n             \n\n              <ion-icon name="people"></ion-icon>\n\n            </ion-thumbnail>\n\n\n\n            \n\n            <button ion-button clear item-end (click)="terminarPedidoDos()">\n\n        \n\n                <ion-icon name="checkmark-circle"></ion-icon>\n\n              </button>\n\n  \n\n            <h1 style="color:black;">Mesa dos</h1>\n\n     \n\n          </ion-item>\n\n\n\n        </ion-list>\n\n\n\n        <ion-list>\n\n\n\n          <ion-item *ngFor="let item of pedidosPruebaTres">\n\n              <ion-thumbnail item-start>\n\n\n\n                \n\n               \n\n                <ion-icon name="people"></ion-icon>\n\n              </ion-thumbnail>\n\n        \n\n              <button ion-button clear item-end (click)="terminarPedidoTres()">\n\n        \n\n                  <ion-icon name="checkmark-circle"></ion-icon>\n\n                </button>\n\n    \n\n              <h1 style="color:black;">Mesa tres</h1>\n\n       \n\n            </ion-item>\n\n\n\n          </ion-list>\n\n\n\n          <ion-list>\n\n\n\n            <ion-item *ngFor="let item of pedidosPruebaCuatro">\n\n                <ion-thumbnail item-start>\n\n                 \n\n                  <ion-icon name="people"></ion-icon>\n\n                </ion-thumbnail>\n\n          \n\n                <button ion-button clear item-end (click)="terminarPedidoCuatro()">\n\n        \n\n                    <ion-icon name="checkmark-circle"></ion-icon>\n\n                  </button>\n\n      \n\n                <h1 style="color:black;">Mesa cuatro</h1>\n\n         \n\n              </ion-item>\n\n\n\n            </ion-list>\n\n\n\n            <ion-list>\n\n\n\n              <ion-item *ngFor="let item of pedidosPruebaCinco">\n\n                  <ion-thumbnail item-start>\n\n                   \n\n                    <ion-icon name="people"></ion-icon>\n\n                  </ion-thumbnail>\n\n            \n\n                  <button ion-button clear item-end (click)="terminarPedidoCinco()">\n\n        \n\n                      <ion-icon name="checkmark-circle"></ion-icon>\n\n                    </button>\n\n        \n\n                  <h1 style="color:black;">Mesa cinco</h1>\n\n           \n\n                </ion-item>\n\n\n\n              </ion-list>\n\n\n\n              <ion-list>\n\n\n\n                <ion-item *ngFor="let item of pedidosPruebaSeis">\n\n                    <ion-thumbnail item-start>\n\n                     \n\n                      <ion-icon name="people"></ion-icon>\n\n                    </ion-thumbnail>\n\n              \n\n                    <button ion-button clear item-end (click)="terminarPedidoSeis()">\n\n        \n\n                        <ion-icon name="checkmark-circle"></ion-icon>\n\n                      </button>\n\n          \n\n                    <h1 style="color:black;">Mesa seis</h1>\n\n             \n\n                  </ion-item>\n\n\n\n                </ion-list>\n\n\n\n                <ion-list>\n\n\n\n                  <ion-item *ngFor="let item of pedidosPruebaSiete">\n\n                      <ion-thumbnail item-start>\n\n                       \n\n                        <ion-icon name="people"></ion-icon>\n\n                      </ion-thumbnail>\n\n                \n\n                      <button ion-button clear item-end (click)="terminarPedidoSiete()">\n\n        \n\n                          <ion-icon name="checkmark-circle"></ion-icon>\n\n                        </button>\n\n            \n\n                      <h1 style="color:black;">Mesa siete</h1>\n\n               \n\n                    </ion-item>\n\n\n\n                  </ion-list>\n\n\n\n                  <ion-list>\n\n\n\n                  <ion-item *ngFor="let item of pedidosPruebaOcho">\n\n                      <ion-thumbnail item-start>\n\n                       \n\n                        <ion-icon name="people"></ion-icon>\n\n                      </ion-thumbnail>\n\n                \n\n                      <button ion-button clear item-end (click)="terminarPedidoOcho()">\n\n        \n\n                          <ion-icon name="checkmark-circle"></ion-icon>\n\n                        </button>\n\n            \n\n                      <h1 style="color:black;">Mesa ocho</h1>\n\n               \n\n                    </ion-item>\n\n\n\n                  </ion-list>\n\n\n\n                  <ion-list>\n\n\n\n                    <ion-item *ngFor="let item of pedidosPruebaNueve">\n\n                        <ion-thumbnail item-start>\n\n                         \n\n                          <ion-icon name="people"></ion-icon>\n\n                        </ion-thumbnail>\n\n\n\n                        <button ion-button clear item-end (click)="terminarPedidoNueve()">\n\n        \n\n                            <ion-icon name="checkmark-circle"></ion-icon>\n\n                          </button>\n\n                  \n\n              \n\n                        <h1 style="color:black;">Mesa nueve</h1>\n\n                 \n\n                      </ion-item>\n\n\n\n                    </ion-list>\n\n\n\n                    <ion-list>\n\n\n\n                      <ion-item *ngFor="let item of pedidosPruebaDiez">\n\n                          <ion-thumbnail item-start>\n\n                           \n\n                            <ion-icon name="people"></ion-icon>\n\n                          </ion-thumbnail>\n\n\n\n                          <button ion-button clear item-end (click)="terminarPedidoDiez()">\n\n        \n\n                              <ion-icon name="checkmark-circle"></ion-icon>\n\n                            </button>\n\n                    \n\n                \n\n                          <h1 style="color:black;">Mesa diez</h1>\n\n                   \n\n                        </ion-item>\n\n    \n\n      </ion-list>\n\n\n\n     <!-- <ion-list>\n\n\n\n          <ion-item *ngFor="let item of pedidosPruebaUno">\n\n            <ion-thumbnail item-start>\n\n             \n\n              <ion-icon name="people"></ion-icon>\n\n            </ion-thumbnail>\n\n  \n\n            <button ion-button clear item-end (click)="terminarPedidoUno()">\n\n          \n\n                <ion-icon name="checkmark-circle"></ion-icon>\n\n              </button>\n\n      \n\n  \n\n            <h1 style="color:black;">Mesa Uno </h1>\n\n     \n\n          </ion-item>\n\n\n\n          </ion-list>-->\n\n\n\n      \n\n        \n\n\n\n    </div>\n\n\n\n    <div *ngIf="vistaCliente" style="padding-top: 40px;background-color: lightblue;background-size: auto;">\n\n\n\n       <!-- <button ion-button clear item-end (click)="mostrarTiempoBarcode()">\n\n            <ion-icon name="expand"></ion-icon>\n\n          </button>-->\n\n\n\n          <button ion-button class="submit-btn" color="red" class="botonAlta" (click)="mostrarTiempoBarcode()" >Escanear mesa</button>\n\n\n\n\n\n    </div>\n\n\n\n    </ion-content>\n\n\n\n\n\n    <div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n      <div class="alert-message animation-target">\n\n        <h1>{{alertTitulo}}</h1>\n\n        <p>{{alertMensaje}}</p>\n\n        <div class="botones">\n\n    \n\n          <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n        </div>\n\n      </div>\n\n    \n\n    </div>\n\n\n\n\n\n      <!--<ion-footer *ngIf="cerrarqr">\n\n        <ion-toolbar>\n\n          <ion-title>Footer</ion-title>\n\n          <button ion-button color="red" class="close" (click)="OcultarLectorQR()">\n\n            <ion-icon name="close"></ion-icon>\n\n          </button>\n\n        </ion-toolbar>\n\n      </ion-footer>-->\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\qr-de-la-mesa\qr-de-la-mesa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], QrDeLaMesaPage);
    return QrDeLaMesaPage;
}());

//# sourceMappingURL=qr-de-la-mesa.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TomarPedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Http } from '@angular/http';




//LINEA 2460 Y 2463
/**
 * Generated class for the TomarPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TomarPedidoPage = /** @class */ (function () {
    function TomarPedidoPage(navCtrl, navParams, authInstance, toastCtrl) {
        /* let localData = http.get('assets/imgs/gamma/information.json').map(res => res.json().items);
         localData.subscribe(data => {
           this.information = data;
         })*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.user_data = [];
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.firestore();
        this.sinPedidos = true;
        this.ponerTiempoMesaCocinaUnoIcono = true;
        this.terminarPedidoMesaCocinaUnoIcono = false;
        this.ponerTiempoMesaCocinaDosIcono = true;
        this.terminarPedidoMesaCocinaDosIcono = false;
        this.ponerTiempoMesaCocinaTresIcono = true;
        this.terminarPedidoMesaCocinaTresIcono = false;
        this.ponerTiempoMesaCocinaCuatroIcono = true;
        this.terminarPedidoMesaCocinaCuatroIcono = false;
        this.ponerTiempoMesaCocinaCincoIcono = true;
        this.terminarPedidoMesaCocinaCincoIcono = false;
        this.ponerTiempoMesaCocinaSeisIcono = true;
        this.terminarPedidoMesaCocinaSeisIcono = false;
        this.ponerTiempoMesaCocinaSieteIcono = true;
        this.terminarPedidoMesaCocinaSieteIcono = false;
        this.ponerTiempoMesaCocinaOchoIcono = true;
        this.terminarPedidoMesaCocinaOchoIcono = false;
        this.ponerTiempoMesaCocinaNueveIcono = true;
        this.terminarPedidoMesaCocinaNueveIcono = false;
        this.ponerTiempoMesaCocinaDiezIcono = true;
        this.terminarPedidoMesaCocinaDiezIcono = false;
        this.vistaCocinaMesaUno = false;
        this.vistaCocinaMesaDos = false;
        this.vistaCocinaMesaTres = false;
        this.vistaCocinaMesaCuatro = false;
        this.vistaCocinaMesaCinco = false;
        this.vistaCocinaMesaSeis = false;
        this.vistaCocinaMesaSiete = false;
        this.vistaCocinaMesaOcho = false;
        this.vistaCocinaMesaNueve = false;
        this.vistaCocinaMesaDiez = false;
        this.vistaBartenderMesaUno = false;
        this.vistaBartenderMesaDos = false;
        this.vistaBartenderMesaTres = false;
        this.vistaBartenderMesaCuatro = false;
        this.vistaBartenderMesaCinco = false;
        this.vistaBartenderMesaSeis = false;
        this.vistaBartenderMesaSiete = false;
        this.vistaBartenderMesaOcho = false;
        this.vistaBartenderMesaNueve = false;
        this.vistaBartenderMesaDiez = false;
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        /* let pedidosRef = this.firebase.database().ref("mesas");
     
         pedidosRef.once("value", (snap) => {
     
           //let data = snap.val();
          // let esValido = true;
          let result = snap.val();
         for(let k in result){ //"k" provides key Id of each object
           this.user_data.push({
            id : k,
            carga : result[k].cantidadComensales,
            numeroMesa : result[k].numeroMesa,
            name : "adasdasd"
          });
         }
     
     
     
           
         });*/
        //this.ocultar=true;
        //CAMBIAR ESTO PARA PROBAR
        //this.vistaCocinero=true;
        //this.vistaBartender=true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "cocinero") {
            this.vistaCocinero = true;
        }
        if (this.usuario.tipo == "bartender") {
            this.vistaBartender = true;
        }
        this.ocultarUno = true;
        this.ocultarDos = true;
        this.ocultarTres = true;
        this.ocultarCuatro = true;
        this.ocultarCinco = true;
        this.ocultarSeis = true;
        this.ocultarSiete = true;
        this.ocultarOcho = true;
        this.ocultarNueve = true;
        this.ocultarDiez = true;
        this.cocina = [];
        this.bartender = [];
        this.pedidos = [];
        this.pedidosCocinaUno = [];
        this.pedidosBartenderUno = [];
        this.pedidosCocinaDos = [];
        this.pedidosBartenderDos = [];
        this.pedidosCocinaTres = [];
        this.pedidosBartenderTres = [];
        this.pedidosCocinaCuatro = [];
        this.pedidosBartenderCuatro = [];
        this.pedidosCocinaCinco = [];
        this.pedidosBartenderCinco = [];
        this.pedidosCocinaSeis = [];
        this.pedidosBartenderSeis = [];
        this.pedidosCocinaSiete = [];
        this.pedidosBartenderSiete = [];
        this.pedidosCocinaOcho = [];
        this.pedidosBartenderOcho = [];
        this.pedidosCocinaNueve = [];
        this.pedidosBartenderNueve = [];
        this.pedidosCocinaDiez = [];
        this.pedidosBartenderDiez = [];
        this.pedidosDeliveryCocinero = [];
        this.pedidosDeliveryBartender = [];
        this.vistaDeliveryCocinero = false;
        this.vistaDeliveryBartender = false;
        //PROBANDO DELIVERY COCINERO
        var deliveryCocinero = this.firebase.database().ref("pedidos/");
        deliveryCocinero.on("value", function (snap) {
            _this.pedidosDeliveryCocinero = [];
            //this.vistaDeliveryCocinero=false;
            var result = snap.val();
            for (var item in result) {
                if (item == "1" || item == "2" || item == "3" || item == "4" || item == "5" || item == "6" || item == "7" || item == "8" || item == "9" || item == "10") {
                    continue;
                }
                //this.pedidosDeliveryCocinero.push(item);
                //console.log(result[item]);
                for (var a in result[item]) {
                    if (a == "cocinero") {
                        _this.vistaDeliveryCocinero = true;
                        for (var j in result[item][a]) {
                            // console.log(result[item][a][j]);
                            if (result[item][a][j] == "tomado") {
                                console.log("llegue aca");
                                _this.pedidosDeliveryCocinero.push(item);
                                //console.log(result[item]);
                            }
                        }
                        //this.pedidosBartenderUno.push(result[k][a]);
                        //this.pedidosDeliveryCocinero.push(result[item][a]);
                        //console.log(result[item][a]);
                    }
                }
            }
        });
        //PROBANDO DELIVERY BARTENDER
        var deliveryBartender = this.firebase.database().ref("pedidos/");
        deliveryBartender.on("value", function (snap) {
            _this.pedidosDeliveryBartender = [];
            _this.vistaDeliveryBartender = false;
            var result = snap.val();
            for (var item in result) {
                if (item == "1" || item == "2" || item == "3" || item == "4" || item == "5" || item == "6" || item == "7" || item == "8" || item == "9" || item == "10") {
                    continue;
                }
                //this.pedidosDeliveryCocinero.push(item);
                //console.log(result[item]);
                for (var a in result[item]) {
                    if (a == "bartender") {
                        _this.vistaDeliveryBartender = true;
                        for (var j in result[item][a]) {
                            // console.log(result[item][a][j]);
                            if (result[item][a][j] == "tomado") {
                                console.log("llegue aca");
                                _this.pedidosDeliveryBartender.push(item);
                                //console.log(result[item]);
                            }
                        }
                        //this.pedidosBartenderUno.push(result[k][a]);
                        //this.pedidosDeliveryCocinero.push(result[item][a]);
                        //console.log(result[item][a]);
                    }
                }
            }
        });
        //PEDIDOS MESA 1
        var pedidosMesaUno = this.firebase.database().ref("pedidos/1/");
        pedidosMesaUno.on("value", function (snap) {
            _this.vistaCocinaMesaUno = false;
            _this.vistaBartenderMesaUno = false;
            _this.pedidosCocinaUno = [];
            _this.pedidosBartenderUno = [];
            //this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        console.log("aca estoy");
                        _this.vistaCocinaMesaUno = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaUno.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaUno = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderUno.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaUno = result[k];
                }
            }
        });
        //PEDIDOS MESA 2
        var pedidosMesaDos = this.firebase.database().ref("pedidos/2/");
        pedidosMesaDos.on("value", function (snap) {
            _this.vistaBartenderMesaDos = false;
            _this.vistaCocinaMesaDos = false;
            _this.pedidosCocinaDos = [];
            _this.pedidosBartenderDos = [];
            // this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaDos = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaDos.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaDos = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderDos.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaDos = result[k];
                }
            }
        });
        //PEDIDOS MESA 3
        var pedidosMesaTres = this.firebase.database().ref("pedidos/3/");
        pedidosMesaTres.on("value", function (snap) {
            _this.vistaCocinaMesaTres = false;
            _this.vistaBartenderMesaTres = false;
            _this.pedidosCocinaTres = [];
            _this.pedidosBartenderTres = [];
            // this.sinPedidos=false;
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") 
                        //if(result[k].estado == "terminado" || result[k].estado == "preparacion")
                        {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaTres = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaTres.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaTres = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderTres.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaTres = result[k];
                }
            }
        });
        //PEDIDOS MESA 4
        var pedidosMesaCuatro = this.firebase.database().ref("pedidos/4/");
        pedidosMesaCuatro.on("value", function (snap) {
            _this.vistaCocinaMesaCuatro = false;
            _this.vistaBartenderMesaCuatro = false;
            _this.pedidosCocinaCuatro = [];
            _this.pedidosBartenderCuatro = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaCuatro = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaCuatro.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaCuatro = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderCuatro.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaCuatro = result[k];
                }
            }
        });
        //PEDIDOS MESA 5
        var pedidosMesaCinco = this.firebase.database().ref("pedidos/5/");
        pedidosMesaCinco.on("value", function (snap) {
            _this.vistaCocinaMesaCinco = false;
            _this.vistaBartenderMesaCinco = false;
            _this.pedidosCocinaCinco = [];
            _this.pedidosBartenderCinco = [];
            var result = snap.val();
            for (var k in result) {
                //this.vistaCocinaMesaCinco=true;
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaCinco = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaCinco.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaCinco = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderCinco.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaCinco = result[k];
                }
            }
        });
        //MESA SEIS
        var pedidosMesaSeis = this.firebase.database().ref("pedidos/6/");
        pedidosMesaSeis.on("value", function (snap) {
            _this.vistaCocinaMesaSeis = false;
            _this.vistaBartenderMesaSeis = false;
            _this.pedidosCocinaSeis = [];
            _this.pedidosBartenderSeis = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaSeis = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaSeis.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaSeis = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderSeis.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaSeis = result[k];
                }
            }
        });
        //PEDIDOS MESA 7
        var pedidosMesaSiete = this.firebase.database().ref("pedidos/7/");
        pedidosMesaSiete.on("value", function (snap) {
            _this.vistaCocinaMesaSiete = false;
            _this.vistaBartenderMesaSiete = false;
            _this.pedidosCocinaSiete = [];
            _this.pedidosBartenderSiete = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaSiete = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaSiete.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaSiete = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderSiete.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaSiete = result[k];
                }
            }
        });
        //PEDIDOS MESA 8
        var pedidosMesaOcho = this.firebase.database().ref("pedidos/8/");
        pedidosMesaOcho.on("value", function (snap) {
            _this.vistaCocinaMesaOcho = false;
            _this.vistaBartenderMesaOcho = false;
            _this.pedidosCocinaOcho = [];
            _this.pedidosBartenderOcho = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaOcho = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaOcho.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaOcho = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderOcho.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaOcho = result[k];
                }
            }
        });
        var pedidosMesaNueve = this.firebase.database().ref("pedidos/9/");
        pedidosMesaNueve.on("value", function (snap) {
            _this.vistaCocinaMesaNueve = false;
            _this.vistaBartenderMesaNueve = false;
            _this.pedidosCocinaNueve = [];
            _this.pedidosBartenderNueve = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaNueve = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaNueve.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaNueve = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderNueve.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaNueve = result[k];
                }
            }
        });
        var pedidosMesaDiez = this.firebase.database().ref("pedidos/10/");
        pedidosMesaDiez.on("value", function (snap) {
            _this.vistaCocinaMesaDiez = false;
            _this.vistaBartenderMesaDiez = false;
            _this.pedidosCocinaDiez = [];
            _this.pedidosBartenderDiez = [];
            var result = snap.val();
            for (var k in result) {
                if (_this.usuario.tipo == "cocinero") {
                    if (k == "cocinero") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaCocinaMesaDiez = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosCocinaDiez.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (_this.usuario.tipo == "bartender") {
                    if (k == "bartender") {
                        if (result[k].estado != "tomado") {
                            _this.sinPedidos = true;
                            break;
                        }
                        _this.sinPedidos = false;
                        _this.vistaBartenderMesaDiez = true;
                        for (var a in result[k]) {
                            if (a != "estado") {
                                if (result[k][a].terminado != "si") {
                                    _this.pedidosBartenderDiez.push(result[k][a]);
                                }
                            }
                        }
                    }
                }
                if (k == "tiempo") {
                    _this.tiempoMesaDiez = result[k];
                }
            }
        });
        /* pedidosRef.once("value", (snap) => {
     
           //let data = snap.val();
          // let esValido = true;
          let result = snap.val();
     
          for(let k in result){
           this.user_data.push({
            numeroMesa : k,
            pedido : result[k].cocinero,
            name : "adasdasd"
          });
         }*/
        //alert(this.user_data);
    }
    TomarPedidoPage.prototype.toggleSection = function (i) {
        //this.information[i].open = !this.information[i].open;
        this.user_data[i].open = !this.user_data[i].open;
    };
    TomarPedidoPage.prototype.toggleItem = function (i, j) {
        //this.information[i].children[j].open = !this.information[i].children[j].open;
        this.user_data[i].cocinero[j].open = !this.user_data[i].cocinero[j].open;
    };
    TomarPedidoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TomarPedidoPage');
    };
    TomarPedidoPage.prototype.probando = function () {
        var _this = this;
        var pedidosRef = this.firebase.database().ref("mesas");
        pedidosRef.once("value", function (snap) {
            //let data = snap.val();
            // let esValido = true;
            var result = snap.val();
            for (var k in result) {
                _this.user_data.push({
                    id: k,
                    carga: result[k].cantidadComensales,
                    numeroMesa: result[k].numeroMesa,
                    name: "adasdasd"
                });
            }
        });
    };
    TomarPedidoPage.prototype.pregunta1 = function () {
        this.tiempoMinimoUno = this.tiempoMesaUno;
        this.ocultarUno = false;
    };
    TomarPedidoPage.prototype.pregunta2 = function () {
        this.tiempoMinimoDos = this.tiempoMesaDos;
        this.ocultarDos = false;
    };
    TomarPedidoPage.prototype.pregunta3 = function () {
        this.tiempoMinimoTres = this.tiempoMesaTres;
        this.ocultarTres = false;
    };
    TomarPedidoPage.prototype.pregunta4 = function () {
        this.tiempoMinimoCuatro = this.tiempoMesaCuatro;
        this.ocultarCuatro = false;
    };
    TomarPedidoPage.prototype.pregunta5 = function () {
        this.tiempoMinimoCinco = this.tiempoMesaCinco;
        this.ocultarCinco = false;
    };
    TomarPedidoPage.prototype.pregunta6 = function () {
        this.tiempoMinimoSeis = this.tiempoMesaSeis;
        this.ocultarSeis = false;
    };
    TomarPedidoPage.prototype.pregunta7 = function () {
        this.tiempoMinimoSiete = this.tiempoMesaSiete;
        this.ocultarSiete = false;
    };
    TomarPedidoPage.prototype.pregunta8 = function () {
        this.tiempoMinimoOcho = this.tiempoMesaOcho;
        this.ocultarOcho = false;
    };
    TomarPedidoPage.prototype.pregunta9 = function () {
        this.tiempoMinimoNueve = this.tiempoMesaNueve;
        this.ocultarNueve = false;
    };
    TomarPedidoPage.prototype.pregunta10 = function () {
        this.tiempoMinimoDiez = this.tiempoMesaDiez;
        this.ocultarDiez = false;
    };
    TomarPedidoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    TomarPedidoPage.prototype.Aceptar1 = function () {
        var _this = this;
        if (this.tiempoMesaUno < this.tiempoMinimoUno) {
            this.ocultarUno = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarUno = true;
        var refUno = this.firebase.database().ref("mesas");
        refUno.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (1 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaUno;
                    refUno.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaUnoIcono = false;
                    _this.terminarPedidoMesaCocinaUnoIcono = true;
                }
            }
        });
        //this.tiempoMesaCuatro;
        /*var refUno = this.firebase.database().ref("mesas");
                            
                            refUno.once('value', (snap) =>
                            {
                                var data = snap.val();
                                //this.estaLibre=true;
                              // ocup=true;
                                for(var key in data)
                                {
    
                                  if (1 == data[key].numeroMesa)
                                  {
                                    data[key].tiempoMinimo = this.tiempoMesaUno;
                                    refUno.child(key).update(data[key]);
    
                                    
                                  }
    
                                  
                                }
    
                                
                              });*/
    };
    TomarPedidoPage.prototype.Aceptar2 = function () {
        // while(this.tiempoMesaDos)
        //let z=this.tiempoMesaDos;
        var _this = this;
        if (this.tiempoMesaDos < this.tiempoMinimoDos) {
            this.ocultarDos = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarDos = true;
        var refDos = this.firebase.database().ref("mesas");
        refDos.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (2 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaDos;
                    refDos.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaDosIcono = false;
                    _this.terminarPedidoMesaCocinaDosIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar3 = function () {
        var _this = this;
        if (this.tiempoMesaTres < this.tiempoMinimoTres) {
            this.ocultarTres = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarTres = true;
        var refTres = this.firebase.database().ref("mesas");
        refTres.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (3 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaTres;
                    refTres.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaTresIcono = false;
                    _this.terminarPedidoMesaCocinaTresIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar4 = function () {
        var _this = this;
        if (this.tiempoMesaCuatro < this.tiempoMinimoCuatro) {
            this.ocultarCuatro = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        //this.ocultarDos=true;
        this.ocultarCuatro = true;
        //this.tiempoMesaCuatro;
        var refCuatro = this.firebase.database().ref("mesas");
        refCuatro.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (4 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaCuatro;
                    refCuatro.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaCuatroIcono = false;
                    _this.terminarPedidoMesaCocinaCuatroIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar5 = function () {
        var _this = this;
        if (this.tiempoMesaCinco < this.tiempoMinimoCinco) {
            this.ocultarCinco = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        this.ocultarCinco = true;
        //this.tiempoMesaCuatro;
        var refCinco = this.firebase.database().ref("mesas");
        refCinco.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (5 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaCinco;
                    refCinco.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaCincoIcono = false;
                    _this.terminarPedidoMesaCocinaCincoIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar6 = function () {
        var _this = this;
        if (this.tiempoMesaSeis < this.tiempoMinimoSeis) {
            this.ocultarSeis = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        //this.ocultar=true;
        //this.ocultarTres=true;
        this.ocultarSeis = true;
        //this.tiempoMesaCuatro;
        var refSeis = this.firebase.database().ref("mesas");
        refSeis.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (6 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaSeis;
                    refSeis.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaSeisIcono = false;
                    _this.terminarPedidoMesaCocinaSeisIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar7 = function () {
        var _this = this;
        if (this.tiempoMesaSiete < this.tiempoMinimoSiete) {
            this.ocultarSiete = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarSiete = true;
        var refSiete = this.firebase.database().ref("mesas");
        refSiete.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (7 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaSiete;
                    refSiete.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaSieteIcono = false;
                    _this.terminarPedidoMesaCocinaSieteIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar8 = function () {
        var _this = this;
        if (this.tiempoMesaOcho < this.tiempoMinimoOcho) {
            this.ocultarOcho = true;
            //alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarOcho = true;
        var refOcho = this.firebase.database().ref("mesas");
        refOcho.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (8 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaOcho;
                    refOcho.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaOchoIcono = false;
                    _this.terminarPedidoMesaCocinaOchoIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar9 = function () {
        var _this = this;
        if (this.tiempoMesaNueve < this.tiempoMinimoNueve) {
            this.ocultarNueve = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarNueve = true;
        var refNueve = this.firebase.database().ref("mesas");
        refNueve.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (9 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaNueve;
                    refNueve.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaNueveIcono = false;
                    _this.terminarPedidoMesaCocinaNueveIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.Aceptar10 = function () {
        var _this = this;
        if (this.tiempoMesaDiez < this.tiempoMinimoDiez) {
            this.ocultarDiez = true;
            // alert("Ponga un tiempo mayor o igual al indicado.")
            this.presentToast("Ponga un tiempo mayor o igual al indicado.");
            return;
        }
        this.ocultarDiez = true;
        var refDiez = this.firebase.database().ref("mesas");
        refDiez.once('value', function (snap) {
            var data = snap.val();
            //this.estaLibre=true;
            // ocup=true;
            for (var key in data) {
                if (10 == data[key].numeroMesa) {
                    data[key].tiempoMinimo = _this.tiempoMesaDiez;
                    refDiez.child(key).update(data[key]);
                    _this.ponerTiempoMesaCocinaDiezIcono = false;
                    _this.terminarPedidoMesaCocinaDiezIcono = true;
                }
            }
        });
    };
    TomarPedidoPage.prototype.terminarPedidoUnoCocinero = function () {
        var refTerminarUnoCocinero = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarUnoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarUnoCocinero.child(k).child(a).update(data[k][a]);
                        }
                        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.TerminarPedidoUnoBartender = function () {
        var refTerminarUnoBartender = this.firebase.database().ref("pedidos/1/");
        refTerminarUnoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarUnoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarUnoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDosCocinero = function () {
        var refTerminarDosCocinero = this.firebase.database().ref("pedidos/2/");
        refTerminarDosCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDosCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDosCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.TerminarPedidoDosBartender = function () {
        var refTerminarDosBartender = this.firebase.database().ref("pedidos/2/");
        refTerminarDosBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDosBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDosBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoTresCocinero = function () {
        var refTerminarTresCocinero = this.firebase.database().ref("pedidos/3/");
        refTerminarTresCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarTresCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarTresCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
            //this.estaLibre=true;
            // ocup=true;
            /*  for(var key in data)
              {

                if (3 == data[key].numeroMesa)
                {
                  data[key].tiempoMinimo = this.tiempoMesaSeis;
                  refTerminarTresCocinero.child(key).update(data[key]);

                  
                }

                
              }*/
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoTresBartender = function () {
        var refTerminarTresBartender = this.firebase.database().ref("pedidos/3/");
        refTerminarTresBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarTresBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarTresBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCuatroCocinero = function () {
        var refTerminarCuatroCocinero = this.firebase.database().ref("pedidos/4/");
        refTerminarCuatroCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCuatroCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCuatroCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //   this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCuatroBartender = function () {
        var refTerminarCuatroBartender = this.firebase.database().ref("pedidos/4/");
        refTerminarCuatroBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCuatroBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCuatroBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCincoCocinero = function () {
        var refTerminarCincoCocinero = this.firebase.database().ref("pedidos/5/");
        refTerminarCincoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCincoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCincoCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoCincoBartender = function () {
        var refTerminarCincoBartender = this.firebase.database().ref("pedidos/5/");
        refTerminarCincoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarCincoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarCincoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSeisCocinero = function () {
        var refTerminarSeisCocinero = this.firebase.database().ref("pedidos/6/");
        refTerminarSeisCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSeisCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSeisCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSeisBartender = function () {
        var refTerminarSeisBartender = this.firebase.database().ref("pedidos/6/");
        refTerminarSeisBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSeisBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSeisBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSieteCocinero = function () {
        var refTerminarSieteCocinero = this.firebase.database().ref("pedidos/7/");
        refTerminarSieteCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSieteCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSieteCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoSieteBartender = function () {
        var refTerminarSieteBartender = this.firebase.database().ref("pedidos/7/");
        refTerminarSieteBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarSieteBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarSieteBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoOchoCocinero = function () {
        var refTerminarOchoCocinero = this.firebase.database().ref("pedidos/8/");
        refTerminarOchoCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarOchoCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarOchoCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoOchoBartender = function () {
        var refTerminarOchoBartender = this.firebase.database().ref("pedidos/8/");
        refTerminarOchoBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarOchoBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarOchoBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoNueveCocinero = function () {
        var refTerminarNueveCocinero = this.firebase.database().ref("pedidos/9/");
        refTerminarNueveCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarNueveCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarNueveCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoNueveBartender = function () {
        var refTerminarNueveBartender = this.firebase.database().ref("pedidos/9/");
        refTerminarNueveBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarNueveBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarNueveBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDiezCocinero = function () {
        var refTerminarDiezCocinero = this.firebase.database().ref("pedidos/10/");
        refTerminarDiezCocinero.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "cocinero") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDiezCocinero.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDiezCocinero.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.terminarPedidoDiezBartender = function () {
        var refTerminarDiezBartender = this.firebase.database().ref("pedidos/10/");
        refTerminarDiezBartender.once('value', function (snap) {
            var data = snap.val();
            for (var k in data) {
                if (k == "bartender") {
                    for (var a in data[k]) {
                        // if(a=="estado")
                        //{
                        //this.pedidosCocinaDos.push(data[k][a]);
                        //}
                        data[k].estado = "preparacion";
                        refTerminarDiezBartender.child(k).update(data[k]);
                        if (a != "estado") {
                            data[k][a].terminado = "si";
                            refTerminarDiezBartender.child(k).child(a).update(data[k][a]);
                        }
                    }
                }
            }
        }).then(function () {
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    };
    TomarPedidoPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            _this.navCtrl.setRoot("");
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot("");
                        }
                    });
                    break;
                }
            }
        });
    };
    TomarPedidoPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    TomarPedidoPage.prototype.terminarDeliveryCocinero = function (probando) {
        var deliveryCocinero = this.firebase.database().ref("pedidos/");
        deliveryCocinero.once("value", function (snap) {
            var result = snap.val();
            for (var item in result) {
                if (item == probando) {
                    for (var a in result[item]) {
                        if (a == "cocinero") {
                            for (var j in result[item][a]) {
                                if (result[item][a][j] == "tomado") {
                                    console.log("llegue aca");
                                    console.log(result[item][a].estado);
                                    result[item][a].estado = "terminado";
                                    deliveryCocinero.child(item).child(a).update(result[item][a]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    TomarPedidoPage.prototype.terminarDeliveryBartender = function (probando) {
        var deliveryBartender = this.firebase.database().ref("pedidos/");
        deliveryBartender.once("value", function (snap) {
            var result = snap.val();
            for (var item in result) {
                if (item == probando) {
                    for (var a in result[item]) {
                        if (a == "bartender") {
                            for (var j in result[item][a]) {
                                if (result[item][a][j] == "tomado") {
                                    console.log("llegue aca");
                                    console.log(result[item][a].estado);
                                    result[item][a].estado = "terminado";
                                    deliveryBartender.child(item).child(a).update(result[item][a]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    TomarPedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tomar-pedido',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\tomar-pedido\tomar-pedido.html"*/'<!--\n\n  Generated template for the TomarPedidoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>tomarPedido</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>-->\n\n\n\n\n\n<!--<ion-header>\n\n    <ion-navbar color="red">\n\n  \n\n      <ion-buttons>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  \n\n \n\n  \n\n      <ion-buttons end>\n\n        <button ion-button>\n\n          <ion-icon name="power"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  \n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n    <ion-menu [content]="content">\n\n      <ion-header>\n\n        <ion-toolbar color="red">\n\n          <ion-title>Menú</ion-title>\n\n        </ion-toolbar>\n\n      </ion-header>\n\n      <ion-content>\n\n        <ion-list>\n\n          <button ion-item>\n\n              <i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Convencional\n\n          </button>\n\n          <button ion-item>\n\n            Friends\n\n          </button>\n\n          <button ion-item>\n\n            Events\n\n          </button>\n\n          <button ion-item>\n\n            Close Menu\n\n          </button>\n\n        </ion-list>\n\n      </ion-content>\n\n    </ion-menu>\n\n  \n\n    <ion-nav #content swipeBackEnabled="false"></ion-nav>-->\n\n\n\n   <!-- <ion-header>\n\n        <ion-navbar>\n\n          <ion-title>\n\n            Academy Pizza\n\n          </ion-title>\n\n        </ion-navbar>\n\n      </ion-header>-->\n\n\n\n      <ion-header>\n\n        <ion-navbar color="dark" hideBackButton="true">\n\n\n\n          <ion-buttons start style="left: 3px;\n\n          position: absolute;">\n\n          <button ion-button (click)="volver()">\n\n        <ion-icon name="arrow-dropleft"></ion-icon>\n\n         </button>\n\n        </ion-buttons>\n\n\n\n        <!-- <ion-title class="titulo2">\n\n            {{usuario.tipo}}\n\n          </ion-title> -->\n\n          \n\n          <ion-buttons end>\n\n\n\n      \n\n            <button ion-button (click)="Logout()">\n\n              <ion-icon name="close"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n      \n\n        </ion-navbar>\n\n      </ion-header>\n\n       \n\n     <!-- <ion-content>\n\n        <ion-list class="accordion-list">\n\n         \n\n          <ion-list-header *ngFor="let item of information; let i = index" no-lines no-padding>\n\n           \n\n           <button ion-item (click)="toggleSection(i)" detail-none [ngClass]="{\'section-active\': item.open, \'section\': !item.open}">\n\n              <ion-icon item-left name="arrow-forward" *ngIf="!item.open"></ion-icon>\n\n              <ion-icon item-left name="arrow-down" *ngIf="item.open"></ion-icon>\n\n                {{ item.name }}\n\n            </button>\n\n          \n\n            <ion-list *ngIf="item.children && item.open" no-lines>\n\n              \n\n              <ion-list-header *ngFor="let child of item.children; let j = index" no-padding>\n\n            \n\n                <button ion-item (click)="toggleItem(i, j)" *ngIf="child.children" class="child" detail-none>\n\n                  <ion-icon item-left name="add" *ngIf="!child.open"></ion-icon>\n\n                  <ion-icon item-left name="close" *ngIf="child.open"></ion-icon>\n\n                  {{ child.name }}\n\n                </button>\n\n       \n\n               \n\n                <ion-item *ngIf="!child.children" ion-item detail-none class="child-item" text-wrap>\n\n                  <h2>{{ child.name }}</h2>\n\n                  <p text-lowercase>{{ child.information }}</p>\n\n                  <button ion-button outline item-end (click)="buyItem(child)">{{ child.estado }}</button>\n\n                </ion-item>\n\n       \n\n                <ion-list *ngIf="child.children && child.open">\n\n             \n\n                  <ion-item *ngFor="let item of child.children; let k = index" detail-none class="child-item" text-wrap>\n\n                    <h2>{{ item.name }}</h2>\n\n                    <p text-lowercase>{{ item.information }}</p>\n\n                  >\n\n                    <button ion-button outline item-end (click)="buyItem(child)">Cambiar tiempo estimado</button>\n\n                    <button ion-button outline item-end (click)="buyItem(item)">Terminar pedido</button>\n\n                  </ion-item>\n\n\n\n                  <div *ngFor="let phone of user_data" >\n\n                    {{phone.phone}}\n\n                    asdasd\n\n                  </div>\n\n\n\n                       </ion-list>\n\n       \n\n              </ion-list-header>\n\n              \n\n            </ion-list>\n\n    \n\n                \n\n               \n\n\n\n              \n\n\n\n        \n\n\n\n                  \n\n\n\n\n\n\n\n           \n\n            \n\n          </ion-list-header>\n\n        </ion-list>\n\n\n\n        <button ion-button class="submit-btn" color="red" style="margin: 0 30px 0 0;width: 70%" (click)="probando()" >Dar de alta la mesa</button>\n\n      \n\n      </ion-content>\n\n    -->\n\n\n\n    \n\n    <ion-content>\n\n\n\n      <div *ngIf="vistaCocinero"> \n\n\n\n          <div class="asdasd" *ngIf="sinPedidos">\n\n              NO HAY PEDIDOS\n\n            </div>\n\n\n\n\n\n      </div>\n\n\n\n      <div *ngIf="vistaBartender">\n\n\n\n          <div class="asdasd" *ngIf="sinPedidos">\n\n              NO HAY PEDIDOS\n\n            </div>\n\n\n\n       </div>\n\n\n\n\n\n     <!-- <div class="asdasd" *ngIf="sinPedidos">\n\n        NO HAY PEDIDOS\n\n      </div>-->\n\n\n\n\n\n\n\n\n\n        <ion-list *ngIf="vistaCocinero">\n\n\n\n          <div *ngIf="vistaCocinaMesaUno">\n\n\n\n            <h2 class="titulo">Lista de pedidos para la mesa 1</h2>\n\n\n\n            <div *ngIf="ponerTiempoMesaCocinaUnoIcono">\n\n\n\n            <button ion-button clear item-end (click)="pregunta1()">\n\n              \n\n                <ion-icon name="alarm"></ion-icon>\n\n              </button>\n\n\n\n            </div>\n\n\n\n            <div *ngIf="terminarPedidoMesaCocinaUnoIcono">\n\n              \n\n              <button ion-button clear item-end (click)="terminarPedidoUnoCocinero()">\n\n                \n\n                  <ion-icon name="checkmark-circle"></ion-icon>\n\n                </button>\n\n\n\n              </div>\n\n  \n\n          <ion-item *ngFor="let item of pedidosCocinaUno">\n\n            <ion-thumbnail item-start>\n\n              <!--<img src={{item.img}}>-->\n\n              <ion-icon name="restaurant"></ion-icon>\n\n            </ion-thumbnail>\n\n      \n\n          <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n            <p>Cliente • {{item.tipo}}</p>-->\n\n            <h1>Nombre: {{item.nombre}}</h1>\n\n            <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n  \n\n          </ion-item>\n\n\n\n        </div>\n\n\n\n\n\n      </ion-list>\n\n\n\n      <ion-list *ngIf="vistaBartender">\n\n\n\n        <div *ngIf="vistaBartenderMesaUno">\n\n\n\n          <h2 class="titulo">Lista de pedidos para la mesa 1</h2>\n\n\n\n          \n\n            \n\n            <button ion-button clear item-end (click)="TerminarPedidoUnoBartender()">\n\n              \n\n                <ion-icon name="checkmark-circle"></ion-icon>\n\n              </button>\n\n\n\n        <ion-item *ngFor="let item of pedidosBartenderUno">\n\n          <ion-thumbnail item-start>\n\n            <!--<img src={{item.img}}>-->\n\n            <ion-icon name="restaurant"></ion-icon>\n\n          </ion-thumbnail>\n\n    \n\n        <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n          <p>Cliente • {{item.tipo}}</p>-->\n\n          <h1>Nombre: {{item.nombre}}</h1>\n\n          <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n        </ion-item>\n\n\n\n\n\n      </div>\n\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngIf="vistaCocinero">\n\n\n\n        <div *ngIf="vistaCocinaMesaDos">\n\n\n\n        <h2 class="titulo">Lista de pedidos para la mesa 2</h2>\n\n\n\n        <div *ngIf="ponerTiempoMesaCocinaDosIcono">\n\n\n\n        <button ion-button clear item-end (click)="pregunta2()">\n\n          \n\n            <ion-icon name="alarm"></ion-icon>\n\n          </button>\n\n\n\n        </div>\n\n\n\n        <div *ngIf="terminarPedidoMesaCocinaDosIcono">\n\n          \n\n          <button ion-button clear item-end (click)="terminarPedidoDosCocinero()">\n\n            \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n          </div>\n\n\n\n      <ion-item *ngFor="let item of pedidosCocinaDos">\n\n        <ion-thumbnail item-start>\n\n          <!--<img src={{item.img}}>-->\n\n          <ion-icon name="restaurant"></ion-icon>\n\n        </ion-thumbnail>\n\n  \n\n      <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n        <p>Cliente • {{item.tipo}}</p>-->\n\n        <h1>Nombre: {{item.nombre}}</h1>\n\n        <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n      </ion-item>\n\n\n\n      </div>\n\n\n\n\n\n\n\n\n\n  </ion-list>\n\n\n\n  <ion-list *ngIf="vistaBartender">\n\n\n\n      <div *ngIf="vistaBartenderMesaDos">\n\n\n\n\n\n\n\n      <h2 class="titulo">Lista de pedidos para la mesa 2</h2>\n\n\n\n     \n\n        \n\n        <button ion-button clear item-end (click)="TerminarPedidoDosBartender()">\n\n          \n\n            <ion-icon name="checkmark-circle"></ion-icon>\n\n          </button>\n\n\n\n    <ion-item *ngFor="let item of pedidosBartenderDos">\n\n      <ion-thumbnail item-start>\n\n        <!--<img src={{item.img}}>-->\n\n        <ion-icon name="restaurant"></ion-icon>\n\n      </ion-thumbnail>\n\n\n\n    <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n      <p>Cliente • {{item.tipo}}</p>-->\n\n      <h1>Nombre: {{item.nombre}}</h1>\n\n      <p>cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n    </ion-item>\n\n\n\n    </div>\n\n\n\n</ion-list>\n\n\n\n<ion-list *ngIf="vistaCocinero">\n\n\n\n    <div *ngIf="vistaCocinaMesaTres">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 3</h2>\n\n\n\n    <div *ngIf="ponerTiempoMesaCocinaTresIcono">\n\n\n\n    <button ion-button clear item-end (click)="pregunta3()">\n\n      \n\n        <ion-icon name="alarm"></ion-icon>\n\n      </button>\n\n      \n\n    </div>\n\n  \n\n    <div *ngIf="terminarPedidoMesaCocinaTresIcono">\n\n\n\n    \n\n      <button ion-button clear item-end (click)="terminarPedidoTresCocinero()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n      </div>\n\n\n\n  <ion-item *ngFor="let item of pedidosCocinaTres">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n<ion-list *ngIf="vistaBartender">\n\n\n\n    <div *ngIf="vistaBartenderMesaTres">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 3</h2>\n\n\n\n    \n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoTresBartender()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n  <ion-item *ngFor="let item of pedidosBartenderTres">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n  </div>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n        \n\n\n\n        <ion-list *ngIf="vistaCocinero">\n\n\n\n            <div *ngIf="vistaCocinaMesaCuatro">\n\n\n\n            <h2 class="titulo">Lista de pedidos para la mesa 4</h2>\n\n\n\n            <div *ngIf="ponerTiempoMesaCocinaCuatroIcono">\n\n\n\n            <button ion-button clear item-end (click)="pregunta4()">\n\n              \n\n                <ion-icon name="alarm"></ion-icon>\n\n              </button>\n\n\n\n            </div>\n\n\n\n            <div *ngIf="terminarPedidoMesaCocinaCuatroIcono">\n\n              \n\n              <button ion-button clear item-end (click)="terminarPedidoCuatroCocinero()">\n\n                \n\n                  <ion-icon name="checkmark-circle"></ion-icon>\n\n                </button>\n\n\n\n              </div>\n\n  \n\n          <ion-item *ngFor="let item of pedidosCocinaCuatro">\n\n            <ion-thumbnail item-start>\n\n              <!--<img src={{item.img}}>-->\n\n              <ion-icon name="restaurant"></ion-icon>\n\n            </ion-thumbnail>\n\n      \n\n          <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n            <p>Cliente • {{item.tipo}}</p>-->\n\n            <h1>Nombre: {{item.nombre}}</h1>\n\n            <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n  \n\n          </ion-item>\n\n\n\n          </div>\n\n\n\n\n\n      </ion-list>\n\n\n\n      <ion-list *ngIf="vistaBartender">\n\n\n\n          <div *ngIf="vistaBartenderMesaCuatro">\n\n\n\n          <h2 class="titulo">Lista de pedidos para la mesa 4</h2>\n\n\n\n          <button ion-button clear item-end (click)="terminarPedidoCuatroBartender()">\n\n                \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n\n\n\n\n          <ion-item *ngFor="let item of pedidosBartenderCuatro">\n\n            <ion-thumbnail item-start>\n\n              <!--<img src={{item.img}}>-->\n\n              <ion-icon name="person"></ion-icon>\n\n            </ion-thumbnail>\n\n      \n\n          <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n            <p>Cliente • {{item.tipo}}</p>-->\n\n            <h1>Nombre: {{item.nombre}}</h1>\n\n            <p>Cantidad: {{item.cantidad}}</p>\n\n           \n\n      \n\n            \n\n          </ion-item>\n\n\n\n          </div>\n\n      \n\n        </ion-list>\n\n\n\n        <ion-list *ngIf="vistaCocinero">\n\n\n\n          <div *ngIf="vistaCocinaMesaCinco">\n\n\n\n            <h2 class="titulo">Lista de pedidos para la mesa 5</h2>\n\n\n\n\n\n            <div *ngIf="ponerTiempoMesaCocinaCincoIcono">\n\n\n\n            <button ion-button clear item-end (click)="pregunta5()">\n\n              \n\n                <ion-icon name="alarm"></ion-icon>\n\n              </button>\n\n\n\n            </div>\n\n\n\n            <div *ngIf="terminarPedidoMesaCocinaCincoIcono">\n\n\n\n              <button ion-button clear item-end (click)="terminarPedidoCincoCocinero()">\n\n                \n\n                  <ion-icon name="checkmark-circle"></ion-icon>\n\n                </button>\n\n\n\n              </div>\n\n\n\n           \n\n  \n\n          <ion-item *ngFor="let item of pedidosCocinaCinco">\n\n            <ion-thumbnail item-start>\n\n              <!--<img src={{item.img}}>-->\n\n              <ion-icon name="person"></ion-icon>\n\n            </ion-thumbnail>\n\n      \n\n          <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n            <p>Cliente • {{item.tipo}}</p>-->\n\n            <h1>Nombre: {{item.nombre}}</h1>\n\n            <p>Cantidad: {{item.cantidad}}</p>\n\n           \n\n      \n\n           \n\n          </ion-item>\n\n\n\n        </div>\n\n\n\n\n\n      </ion-list>\n\n\n\n      <ion-list *ngIf="vistaBartender">\n\n\n\n          <div *ngIf="vistaBartenderMesaCinco">\n\n\n\n          <h2 class="titulo">Lista de pedidos para la mesa 5</h2>\n\n\n\n          \n\n\n\n          <button ion-button clear item-end (click)="terminarPedidoCincoBartender()">\n\n                \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n         \n\n\n\n\n\n\n\n        <ion-item *ngFor="let item of pedidosBartenderCinco">\n\n          <ion-thumbnail item-start>\n\n            <!--<img src={{item.img}}>-->\n\n            <ion-icon name="person"></ion-icon>\n\n          </ion-thumbnail>\n\n    \n\n        <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n          <p>Cliente • {{item.tipo}}</p>-->\n\n          <h1>Nombre: {{item.nombre}}</h1>\n\n          <p>Cantidad: {{item.cantidad}}</p>\n\n         \n\n    \n\n          \n\n        </ion-item>\n\n\n\n          </div>\n\n\n\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngIf="vistaCocinero">\n\n\n\n        <div *ngIf="vistaCocinaMesaSeis">\n\n\n\n        <h2 class="titulo">Lista de pedidos para la mesa 6</h2>\n\n\n\n        <div *ngIf="ponerTiempoMesaCocinaSeisIcono">\n\n\n\n        <button ion-button clear item-end (click)="pregunta6()">\n\n          \n\n            <ion-icon name="alarm"></ion-icon>\n\n          </button>\n\n\n\n        </div>\n\n\n\n        <div *ngIf="terminarPedidoMesaCocinaSeisIcono">\n\n          \n\n          <button ion-button clear item-end (click)="terminarPedidoSeisCocinero()">\n\n            \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n          </div>\n\n\n\n      <ion-item *ngFor="let item of pedidosCocinaSeis">\n\n        <ion-thumbnail item-start>\n\n          <!--<img src={{item.img}}>-->\n\n          <ion-icon name="restaurant"></ion-icon>\n\n        </ion-thumbnail>\n\n  \n\n      <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n        <p>Cliente • {{item.tipo}}</p>-->\n\n        <h1>Nombre: {{item.nombre}}</h1>\n\n        <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n      </ion-item>\n\n\n\n        </div>\n\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngIf="vistaBartender">\n\n      \n\n        <div *ngIf="vistaBartenderMesaSeis">\n\n\n\n        <h2 class="titulo">Lista de pedidos para la mesa 6</h2>\n\n\n\n\n\n\n\n        \n\n          \n\n          <button ion-button clear item-end (click)="terminarPedidoSeisBartender()">\n\n            \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n      <ion-item *ngFor="let item of pedidosBartenderSeis">\n\n        <ion-thumbnail item-start>\n\n          <!--<img src={{item.img}}>-->\n\n          <ion-icon name="restaurant"></ion-icon>\n\n        </ion-thumbnail>\n\n  \n\n      <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n        <p>Cliente • {{item.tipo}}</p>-->\n\n        <h1>Nombre: {{item.nombre}}</h1>\n\n        <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n      </ion-item>\n\n\n\n        </div>\n\n\n\n    </ion-list>\n\n    \n\n\n\n    <ion-list *ngIf="vistaCocinero">\n\n\n\n        <div *ngIf="vistaCocinaMesaSiete">\n\n\n\n        <h2 class="titulo">Lista de pedidos para la mesa 7</h2>\n\n\n\n        <div *ngIf="ponerTiempoMesaCocinaSieteIcono">\n\n\n\n        <button ion-button clear item-end (click)="pregunta7()">\n\n          \n\n            <ion-icon name="alarm"></ion-icon>\n\n          </button>\n\n\n\n        </div>\n\n\n\n        <div *ngIf="terminarPedidoMesaCocinaSieteIcono">\n\n          \n\n          <button ion-button clear item-end (click)="terminarPedidoSieteCocinero()">\n\n            \n\n              <ion-icon name="checkmark-circle"></ion-icon>\n\n            </button>\n\n\n\n          </div>\n\n\n\n      <ion-item *ngFor="let item of pedidosCocinaSiete">\n\n        <ion-thumbnail item-start>\n\n          <!--<img src={{item.img}}>-->\n\n          <ion-icon name="restaurant"></ion-icon>\n\n        </ion-thumbnail>\n\n  \n\n      <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n        <p>Cliente • {{item.tipo}}</p>-->\n\n        <h1>Nombre: {{item.nombre}}</h1>\n\n        <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n      </ion-item>\n\n\n\n        </div>\n\n\n\n\n\n  </ion-list>\n\n\n\n\n\n  <ion-list *ngIf="vistaBartender">\n\n\n\n      <div *ngIf="vistaBartenderMesaSiete">\n\n\n\n      <h2 class="titulo">Lista de pedidos para la mesa 7</h2>\n\n\n\n      \n\n        \n\n        <button ion-button clear item-end (click)="terminarPedidoSieteBartender()">\n\n          \n\n            <ion-icon name="checkmark-circle"></ion-icon>\n\n          </button>\n\n\n\n    <ion-item *ngFor="let item of pedidosBartenderSiete">\n\n      <ion-thumbnail item-start>\n\n        <!--<img src={{item.img}}>-->\n\n        <ion-icon name="restaurant"></ion-icon>\n\n      </ion-thumbnail>\n\n\n\n    <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n      <p>Cliente • {{item.tipo}}</p>-->\n\n      <h1>Nombre: {{item.nombre}}</h1>\n\n      <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n    </ion-item>\n\n\n\n      </div>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n<ion-list *ngIf="vistaCocinero">\n\n\n\n    <div *ngIf="vistaCocinaMesaOcho">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 8</h2>\n\n\n\n    <div *ngIf="ponerTiempoMesaCocinaOchoIcono">\n\n\n\n    <button ion-button clear item-end (click)="pregunta8()">\n\n      \n\n        <ion-icon name="alarm"></ion-icon>\n\n      </button>\n\n\n\n    </div>\n\n\n\n    <div *ngIf="terminarPedidoMesaCocinaOchoIcono">\n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoOchoCocinero()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n      </div>\n\n\n\n  <ion-item *ngFor="let item of pedidosCocinaOcho">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n<ion-list *ngIf="vistaBartender">\n\n\n\n    <div *ngIf="vistaBartenderMesaOcho">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 8</h2>\n\n\n\n    \n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoOchoBartender()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n  <ion-item *ngFor="let item of pedidosBartenderOcho">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n<ion-list *ngIf="vistaCocinero">\n\n\n\n    <div *ngIf="vistaCocinaMesaNueve">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 9</h2>\n\n\n\n    <div *ngIf="ponerTiempoMesaCocinaNueveIcono">\n\n\n\n    <button ion-button clear item-end (click)="pregunta9()">\n\n      \n\n        <ion-icon name="alarm"></ion-icon>\n\n      </button>\n\n\n\n    </div>\n\n\n\n    <div *ngIf="terminarPedidoMesaCocinaNueveIcono">\n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoNueveCocinero()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n      </div>\n\n\n\n  <ion-item *ngFor="let item of pedidosCocinaNueve">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n<ion-list *ngIf="vistaBartender">\n\n\n\n    <div *ngIf="vistaBartenderMesaNueve">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 9</h2>\n\n\n\n    \n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoNueveBartender()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n  <ion-item *ngFor="let item of pedidosBartenderNueve">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n<ion-list *ngIf="vistaCocinero">\n\n\n\n    <div *ngIf="vistaCocinaMesaDiez">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 10</h2>\n\n\n\n    <div *ngIf="ponerTiempoMesaCocinaDiezIcono">\n\n\n\n    <button ion-button clear item-end (click)="pregunta10()">\n\n      \n\n        <ion-icon name="alarm"></ion-icon>\n\n      </button>\n\n\n\n    </div>\n\n\n\n    <div *ngIf="terminarPedidoMesaCocinaDiezIcono">\n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoDiezCocinero()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n      </div>\n\n\n\n  <ion-item *ngFor="let item of pedidosCocinaDiez">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n<ion-list *ngIf="vistaBartender">\n\n\n\n    <div *ngIf="vistaBartenderMesaDiez">\n\n\n\n    <h2 class="titulo">Lista de pedidos para la mesa 10</h2>\n\n\n\n    \n\n      \n\n      <button ion-button clear item-end (click)="terminarPedidoDiezBartender()">\n\n        \n\n          <ion-icon name="checkmark-circle"></ion-icon>\n\n        </button>\n\n\n\n  <ion-item *ngFor="let item of pedidosBartenderDiez">\n\n    <ion-thumbnail item-start>\n\n      <!--<img src={{item.img}}>-->\n\n      <ion-icon name="restaurant"></ion-icon>\n\n    </ion-thumbnail>\n\n\n\n  <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n    <p>Cliente • {{item.tipo}}</p>-->\n\n    <h1>Nombre: {{item.nombre}}</h1>\n\n    <p>Cantidad: {{item.cantidad}}</p>\n\n\n\n\n\n\n\n\n\n  </ion-item>\n\n\n\n    </div>\n\n\n\n\n\n</ion-list>\n\n\n\n\n\n  <ion-list *ngIf="vistaCocinero">\n\n\n\n    <div *ngIf="vistaDeliveryCocinero">\n\n      <div>\n\n\n\n        <h2 class="titulo">Pedidos delivery</h2>\n\n\n\n        \n\n\n\n        <ion-item *ngFor="let item of pedidosDeliveryCocinero">\n\n\n\n            \n\n\n\n            <!--<ion-thumbnail item-start>\n\n                \n\n                <ion-icon name="bycicle"></ion-icon>\n\n              </ion-thumbnail>-->\n\n          \n\n            <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n              <p>Cliente • {{item.tipo}}</p>-->\n\n              <h3>{{item}}</h3>\n\n\n\n              <button ion-button clear item-end (click)="terminarDeliveryCocinero(item)">\n\n        \n\n                  <ion-icon name="checkmark-circle"></ion-icon>\n\n                </button>\n\n              \n\n            \n\n     \n\n        </ion-item>\n\n\n\n      </div>\n\n\n\n    </div>\n\n\n\n  </ion-list>\n\n\n\n  <ion-list *ngIf="vistaBartender">\n\n\n\n\n\n    <div *ngIf="vistaDeliveryBartender">\n\n        <div>\n\n  \n\n          <h2 class="titulo">Pedidos delivery</h2>\n\n  \n\n          \n\n  \n\n          <ion-item *ngFor="let item of pedidosDeliveryBartender">\n\n  \n\n              \n\n  \n\n             <!-- <ion-thumbnail item-start>\n\n                  <img src={{item.img}}>\n\n                  <ion-icon name="restaurant"></ion-icon>\n\n                </ion-thumbnail>-->\n\n            \n\n              <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n                <p>Cliente • {{item.tipo}}</p>-->\n\n                <h3>{{item}}</h3>\n\n  \n\n                <button ion-button clear item-end (click)="terminarDeliveryBartender(item)">\n\n          \n\n                    <ion-icon name="checkmark-circle"></ion-icon>\n\n                  </button>\n\n                \n\n              \n\n       \n\n          </ion-item>\n\n  \n\n        </div>\n\n          \n\n      </div>\n\n\n\n\n\n   \n\n\n\n\n\n\n\n\n\n\n\n  </ion-list>\n\n  \n\n  \n\n\n\n\n\n\n\n    </ion-content>\n\n\n\n    <div class="pregunta1"  [ngClass]="{\'noMostrar\':ocultarUno}">\n\n        <div class="laPregunta1">\n\n           \n\n            <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n     \n\n            <ion-item>\n\n        \n\n                <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaUno"></ion-input>\n\n              </ion-item>\n\n              <button class="aceptar"  (click)="Aceptar1()"  ion-button color="red">Aceptar</button>\n\n              \n\n          </div>\n\n      </div>\n\n\n\n\n\n      <div class="pregunta2"  [ngClass]="{\'noMostrar\':ocultarDos}">\n\n          <div class="laPregunta2">\n\n             \n\n              <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n       \n\n              <ion-item>\n\n          \n\n                  <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaDos"></ion-input>\n\n                </ion-item>\n\n                <button class="aceptar"  (click)="Aceptar2()"  ion-button color="red">Aceptar</button>\n\n                \n\n            </div>\n\n        </div>\n\n\n\n        <div class="pregunta3"  [ngClass]="{\'noMostrar\':ocultarTres}">\n\n            <div class="laPregunta3">\n\n               \n\n                <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n         \n\n                <ion-item>\n\n            \n\n                    <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaTres"></ion-input>\n\n                  </ion-item>\n\n                  <button class="aceptar"  (click)="Aceptar3()"  ion-button color="red">Aceptar</button>\n\n                  \n\n              </div>\n\n          </div>\n\n\n\n\n\n    <div class="pregunta4"  [ngClass]="{\'noMostrar\':ocultarCuatro}">\n\n        <div class="laPregunta4">\n\n           \n\n            <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n     \n\n            <ion-item>\n\n        \n\n                <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaCuatro"></ion-input>\n\n              </ion-item>\n\n              <button class="aceptar"  (click)="Aceptar4()"  ion-button color="red">Aceptar</button>\n\n              \n\n          </div>\n\n      </div>\n\n\n\n      <div class="pregunta5"  [ngClass]="{\'noMostrar\':ocultarCinco}">\n\n          <div class="laPregunta5">\n\n             \n\n              <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n       \n\n              <ion-item>\n\n          \n\n                  <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaCinco"></ion-input>\n\n                </ion-item>\n\n                <button class="aceptar"  (click)="Aceptar5()"  ion-button color="red">Aceptar</button>\n\n                \n\n            </div>\n\n        </div>\n\n\n\n        <div class="pregunta6"  [ngClass]="{\'noMostrar\':ocultarSeis}">\n\n            <div class="laPregunta6">\n\n               \n\n                <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n         \n\n                <ion-item>\n\n            \n\n                    <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaSeis"></ion-input>\n\n                  </ion-item>\n\n                  <button class="aceptar"  (click)="Aceptar6()"  ion-button color="red">Aceptar</button>\n\n                  \n\n              </div>\n\n          </div>\n\n\n\n\n\n      <div class="pregunta7"  [ngClass]="{\'noMostrar\':ocultarSiete}">\n\n          <div class="laPregunta7">\n\n             \n\n              <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n       \n\n              <ion-item>\n\n          \n\n                  <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaSiete"></ion-input>\n\n                </ion-item>\n\n                <button class="aceptar"  (click)="Aceptar7()"  ion-button color="red">Aceptar</button>\n\n                \n\n            </div>\n\n        </div>\n\n\n\n        <div class="pregunta8"  [ngClass]="{\'noMostrar\':ocultarOcho}">\n\n            <div class="laPregunta8">\n\n               \n\n                <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n         \n\n                <ion-item>\n\n            \n\n                    <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaOcho"></ion-input>\n\n                  </ion-item>\n\n                  <button class="aceptar"  (click)="Aceptar8()"  ion-button color="red">Aceptar</button>\n\n                  \n\n              </div>\n\n          </div>\n\n\n\n          <div class="pregunta9"  [ngClass]="{\'noMostrar\':ocultarNueve}">\n\n              <div class="laPregunta9">\n\n                 \n\n                  <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n           \n\n                  <ion-item>\n\n              \n\n                      <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaNueve"></ion-input>\n\n                    </ion-item>\n\n                    <button class="aceptar"  (click)="Aceptar9()"  ion-button color="red">Aceptar</button>\n\n                    \n\n                </div>\n\n            </div>\n\n\n\n            <div class="pregunta10"  [ngClass]="{\'noMostrar\':ocultarDiez}">\n\n                <div class="laPregunta10">\n\n                   \n\n                    <h2>¿Cuál es el tiempo mínimo para este pedido?</h2>\n\n             \n\n                    <ion-item>\n\n                \n\n                        <ion-input placeholder="Escríbalo aquí"  [(ngModel)]="tiempoMesaDiez"></ion-input>\n\n                      </ion-item>\n\n                      <button class="aceptar"  (click)="Aceptar10()"  ion-button color="red">Aceptar</button>\n\n                      \n\n                  </div>\n\n              </div>\n\n\n\n          '/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\tomar-pedido\tomar-pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], TomarPedidoPage);
    return TomarPedidoPage;
}());

//# sourceMappingURL=tomar-pedido.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaDeRutaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__encuesta_de_empleado_encuesta_de_empleado__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { Content } from 'ionic-angular';
/**
 * Generated class for the MapaDeRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapaDeRutaPage = /** @class */ (function () {
    function MapaDeRutaPage(navCtrl, navParams, alert, authInstance) {
        //this.authInstance.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.authInstance = authInstance;
        this.nombre = "lucas";
        this.firebase = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a;
        this.ListadoDeChats = ["asd", "probando", "gg"];
        this.sinPedidos = true;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        if (this.usuario.tipo == "repartidor") {
            this.clientes = true;
        }
        if (this.usuario.tipo == "cliente") {
            this.chat = true;
            this.mandar = true;
            this.ref = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('mensajes/' + this.usuario.apellido);
            this.ref.on('value', function (data) {
                var tmp = [];
                data.forEach(function (data) {
                    tmp.push({
                        key: data.key,
                        name: data.val().name,
                        tiempo: data.val().tiempo,
                        //ame: ,
                        message: data.val().message
                    });
                });
                _this.messagesList = tmp;
            });
        }
        //this.clientes=true;
        //this.chat=false;
        //this.probanding="yo";
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.probanding = this.usuario.apellido;
        /*	let genteRef = firebase.database().ref("usuarios");
       
           genteRef.on("value", (snap) => {
       
             this.usuarios=[];
       
             let data = snap.val();
       
             for (let item in data) {
       
               this.usuarios.push(data[item]);
             }
       
             this.clientesConPedidos = this.usuarios.filter(item => {
       
               
               return item.estado=="delivery";
             });
       
            
       
             console.log(this.usuarios);
       
       
           });*/
        var genteRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        genteRef.on("value", function (snap) {
            _this.clientesConPedidos = [];
            //this.sinPedidos=true;
            var data = snap.val();
            var _loop_1 = function (item) {
                //console.log(item);
                if (data[item].estado == "delivery") {
                    console.log("aca toy");
                    //console.log(data[item]);
                    //this.clientesConPedidos.push(data[item]);
                    var probandoRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("pedidos");
                    probandoRef.once("value", function (snap) {
                        _this.sinPedidos = true;
                        //this.clientesConPedidos=[];
                        var dataDos = snap.val();
                        for (var a in dataDos) {
                            //console.log(a);
                            var pruebita = data[item].correo;
                            var patron = '@';
                            var nuevo = '';
                            var cadena = pruebita.replace(patron, nuevo);
                            patron = '.';
                            nuevo = '';
                            cadena = cadena.replace(patron, nuevo);
                            pruebita = cadena;
                            //console.log(pruebita);
                            if (a == pruebita) {
                                var vale = 0;
                                var cocinero = false;
                                var bartender = false;
                                for (var dios in dataDos[a]) {
                                    //console.log(dios);
                                    if (dios == "cocinero") {
                                        cocinero = true;
                                        //console.log("asd");
                                    }
                                    if (dios == "bartender") {
                                        bartender = true;
                                        //console.log("Asd");
                                    }
                                }
                                for (var dios in dataDos[a]) {
                                    //console.log(dataDos[a]);
                                    if (dios != "tiempo") {
                                        /*	if(dataDos[a][dios].estado=="terminado")
                                            {
            
                                                    if(bartender==true && cocinero==true)
                                                    {
                                                    
                                                        this.clientesConPedidos.push(data[item]);
                                                        console.log("los dos")
                                                        break;
                                                    
                                                    }
    
                                                    //this.clientesConPedidos.push(data[item]);
            
                                            }*/
                                        if (dataDos[a][dios].estado == "terminado") {
                                            vale++;
                                            if (bartender == true && cocinero == true) {
                                                if (vale == 2) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("los 2");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                            if (bartender == true && cocinero == false) {
                                                if (vale == 1) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("barteneder");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                            if (cocinero == true && bartender == false) {
                                                if (vale == 1) {
                                                    _this.clientesConPedidos.push(data[item]);
                                                    console.log("cocinero");
                                                    _this.sinPedidos = false;
                                                    break;
                                                }
                                            }
                                        }
                                        //console.log(dataDos[a][dios].estado);
                                    }
                                    //console.log(dataDos[a][dios].estado);
                                    /*	if(dataDos[a][dios].estado=="terminado")
                                        {
        
                                                if(bartender==true && cocinero==true)
                                                {
                                                
                                                    this.clientesConPedidos.push(data[item]);
                                                    console.log("los dos")
                                                    break;
                                                
                                                }
        
                                        }*/
                                }
                                /*for(let dios in dataDos[a])
                                {
                                    if (data[a][dios].estado=="terminado")
                                    {
                                    vale++;
    
                                    if(bartender==true && cocinero==true)
                                    {
                                        if(vale==2)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                            console.log("los 2")
                                            break;
                                        }
    
                                    }
    
                                    if(bartender==true && cocinero==false)
                                    {
                                        if(vale==1)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                        console.log("barteneder")
                                        break;
                                        }
    
                                    }
                                    if(cocinero==true && bartender == false)
                                    {
                                        if(vale==1)
                                        {
                                            this.clientesConPedidos.push(data[item]);
                                        console.log("cocinero")
                                        break;
                                        }
    
                                    }
                                    
    
                                    }
    
                                //console.log("llegue papu");
                            }*/
                            }
                        }
                    });
                }
                //this.usuarios.push(data[item]);
            };
            for (var item in data) {
                _loop_1(item);
            }
        });
        /*this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
        
        this.ref.on('value',data => {
            let tmp = [];
            data.forEach( data => {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    message: data.val().message
                })
            });
            this.messagesList = tmp;
    
            
        });*/
        //setTimeout(() => {
        //	this.content.scrollToBottom(300);
        //}, 1000);
    }
    MapaDeRutaPage.prototype.ionViewDidLoad = function () {
        //alert(this.usuario.tipo);
        //this.content.scrollToBottom(300);
        //console.log('ionViewDidLoad MapaDeRutaPage');
        // Presenting popup
        /*  	this.alert.create({
                title:'Username',
                inputs:[{
                    name:'username',
                    placeholder: 'username'
                }],
                buttons:[{
                    text: 'Continue',
                    handler: username =>{
                  this.name = username
                 
                    }
                }]
            }).present();
            
             this.ref = firebase.database().ref('mensajes/' + this.nombre);
        
            
            this.ref.on('value',data => {
                let tmp = [];
                data.forEach( data => {
                    tmp.push({
                        key: data.key,
                        name: data.val().name,
                        message: data.val().message
                    })
                });
                this.messagesList = tmp;
            });
        
        
        
                */
    };
    MapaDeRutaPage.prototype.send = function () {
        this.ref;
        /*this.ref.on('value',data => {
            let tmp = [];
            data.forEach( data => {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    message: data.val().message
                })
            });
            this.messagesList = tmp;
          });*/
        if (this.usuario.tipo == "cliente") {
            this.ref = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('mensajes/' + this.usuario.apellido);
        }
        //this.ref=firebase.database().ref('mensajes/' + this.usuario.apellido);
        // add new data to firebase
        this.ref.push({
            //name: this.name.username,
            //name: "yo",
            name: this.usuario.apellido,
            message: this.newmessage,
            tiempo: Date(),
        });
        this.newmessage = "";
    };
    MapaDeRutaPage.prototype.chatear = function (item) {
        var _this = this;
        this.clientes = false;
        this.chat = true;
        this.mandar = true;
        this.probando = item.img;
        this.nombreCliente = item.nombre;
        this.direccionCliente = item.correo;
        var apellido = item.apellido;
        //this.ref=firebase.database().ref('mensajes/' + this.nombreCliente);
        this.ref = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('mensajes/' + apellido);
        console.log(apellido);
        this.ref.on('value', function (data) {
            var tmp = [];
            data.forEach(function (data) {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    tiempo: data.val().tiempo,
                    //ame: ,
                    message: data.val().message
                });
            });
            _this.messagesList = tmp;
            setTimeout(function () {
                try {
                    _this.content.scrollToBottom(0);
                }
                catch (error) {
                    console.log("Entre al catch del scrollbottom()");
                }
            }, 100);
        });
    };
    MapaDeRutaPage.prototype.volver = function () {
        this.navCtrl.pop();
    };
    MapaDeRutaPage.prototype.entregar = function (item) {
        var pruebita = item.correo;
        var patron = '@';
        var nuevo = '';
        var cadena = pruebita.replace(patron, nuevo);
        patron = '.';
        nuevo = '';
        cadena = cadena.replace(patron, nuevo);
        pruebita = cadena;
        console.log(item);
        var probandoRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("usuarios");
        probandoRef.once("value", function (snap) {
            var data = snap.val();
            for (var a in data) {
                if (data[a].correo == item.correo) {
                    //console.log("llegb ro");
                    data[a].estado = "deliveryTerminado";
                    probandoRef.child(a).update(data[a]);
                    var pedidoRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("pedidos").child(pruebita);
                    pedidoRef.remove();
                    var mensajesRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("mensajes").child(item.apellido);
                    mensajesRef.remove();
                }
            }
        });
        //let clienteRef = firebase.database().ref("usuarios").child(item.key);
        //clienteRef.child(item).update({ pago: "si" });
        //let pedidoRef = firebase.database().ref("pedidos").child(pruebita);
        //pedidoRef.remove();
    };
    MapaDeRutaPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            localStorage.setItem("desloguear", "true");
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], MapaDeRutaPage.prototype, "content", void 0);
    MapaDeRutaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mapa-de-ruta',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\mapa-de-ruta\mapa-de-ruta.html"*/'<!--\n\n  Generated template for the MapaDeRutaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>mapaDeRuta</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>-->\n\n\n\n<ion-header>\n\n\n\n\n\n  <ion-navbar color="dark" hideBackButton="true">\n\n\n\n      \n\n\n\n    \n\n    <!-- <ion-title class="titulo2">\n\n      {{usuario.tipo}}\n\n    </ion-title> -->\n\n\n\n    <ion-buttons start style="left: 3px;\n\n    position: absolute;">\n\n    <button ion-button (click)="volver()">\n\n  <ion-icon name="arrow-dropleft"></ion-icon>\n\n   </button>\n\n  </ion-buttons>\n\n\n\n    \n\n\n\n    <ion-buttons end >\n\n\n\n       \n\n\n\n       \n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n\n\n\n\n<!--<ion-content padding class="home">\n\n\n\n    <ion-row class="logo-row">\n\n       \n\n        <ion-col>\n\n            <img src="assets/imgs/gamma/mapaderuta.jpg"/>\n\n          \n\n        </ion-col>\n\n        \n\n      </ion-row>\n\n\n\n      \n\n      <ion-label class="lb" >Cliente: supercalifragilisticoespialidoso</ion-label>\n\n      <ion-label class="lb" >Direccion:  Av. Bartolomé Mitre 750</ion-label>\n\n      \n\n  \n\n\n\n   <ion-list>\n\n     <ion-item *ngFor="let chat of ListadoDeChats">\n\n\n\n   \n\n     <div class="chat-message" text-right >\n\n       <div class="right-bubble">\n\n         <span class="msg-name">Yo</span>\n\n         <span class="msg-date">asdasd</span>\n\n         <p text-wrap>fdsfs</p>\n\n       </div>\n\n     </div>\n\n\n\n     <div class="chat-message" text-left >\n\n       <div class="left-bubble">\n\n         <span class="msg-name">Cliente:Juan Perez</span>\n\n         <span class="msg-date">sdfs</span>\n\n         <p text-wrap>asdasd</p>\n\n       </div>\n\n     </div>\n\n\n\n   \n\n   </ion-item>\n\n </ion-list>\n\n   \n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n<ion-footer no-shadow >\n\n  <ion-toolbar position="bottom" color="light">\n\n    <form (ngSubmit)="enviarMensaje()" #registerForm="ngForm">\n\n      <ion-row>\n\n            <ion-input type="text" placeholder="Nuevo Mensaje" name="mensaje" class="input" [(ngModel)]="mensaje" required></ion-input>\n\n            <ion-buttons end>\n\n                <button ion-button class="submit-btn" icon-only type="submit" [disabled]="!registerForm.form.valid">\n\n                    <ion-icon name="arrow-round-forward"></ion-icon>\n\n                </button>\n\n            </ion-buttons>\n\n      </ion-row>\n\n    </form>\n\n  </ion-toolbar>\n\n</ion-footer>-->\n\n\n\n\n\n\n\n\n\n<ion-content #content>\n\n\n\n  <div *ngIf="clientes">\n\n\n\n      <div class="asdasd" *ngIf="sinPedidos">\n\n          SIN PEDIDOS\n\n        </div>\n\n        \n\n        <div class="mapouter" *ngIf="!sinPedidos">\n\n          <div class="gmap_canvas">\n\n            <iframe width="600" height="500" id="gmap_canvas" \n\n              src="https://maps.google.com/maps?q=mitre%20750&t=&z=19&ie=UTF8&iwloc=&output=embed" \n\n              frameborder="0" scrolling="no" marginheight="0" marginwidth="0">\n\n            </iframe>Google Maps by ASGARDIANOS</div>\n\n            <style>\n\n              .mapouter{\n\n                position:relative;\n\n                text-align:right;\n\n                height:500px;\n\n                width:600px;\n\n                }\n\n              .gmap_canvas {\n\n                overflow:hidden;\n\n                background:none!important;\n\n                height:500px;\n\n                width:600px;\n\n              }\n\n            </style>\n\n      </div>\n\n\n\n    <ion-list>\n\n\n\n        <!--<h2 class="titulo">Lista de empleados con pedidos realizados</h2>-->\n\n\n\n        <ion-list-header style="background-color:#99bbff" *ngIf="!sinPedidos">\n\n          <div class="realizarEncuesta">Pedidos a entregar</div>\n\n        </ion-list-header>\n\n    \n\n       \n\n    \n\n      <ion-item *ngFor="let item of clientesConPedidos">\n\n        <ion-thumbnail item-start>\n\n          <!--<img src={{item.img}}>-->\n\n          <ion-icon name="contact"></ion-icon>\n\n        </ion-thumbnail>\n\n    \n\n      <!--  <h1>{{item.correo}}, {{item.nombre}}</h1>\n\n        <p>Cliente • {{item.tipo}}</p>-->\n\n        <h1 class="que">{{item.nombre}}</h1>\n\n        <p class="queDos">{{item.correo}}</p>\n\n\n\n        <button ion-button clear item-end (click)="chatear(item)">\n\n            <ion-icon name="chatboxes"></ion-icon>\n\n          </button>\n\n\n\n          <button ion-button clear item-end (click)="entregar(item)">\n\n            <ion-icon name="checkmark-circle"></ion-icon>\n\n          </button>\n\n    \n\n    \n\n    \n\n    \n\n      </ion-item>\n\n    \n\n    \n\n    </ion-list>\n\n\n\n    </div>\n\n\n\n    <div *ngIf="chat">\n\n\n\n\n\n\n\n\n\n        <img src={{probando}} style="width: 100px;">\n\n    \n\n\n\n          <ion-label class="lb" >{{nombreCliente}}</ion-label>\n\n          <ion-label class="lb" >{{direccionCliente}}</ion-label>\n\n\n\n          \n\n\n\n        \n\n\n\n\n\n	<ion-list no-lines>\n\n\n\n		<ion-item *ngFor="let message of messagesList">\n\n		<!--	<h3>{{message.name}}</h3>\n\n      <p>{{message.message}}</p>-->\n\n\n\n      <div class="chat-message" text-right *ngIf="message.name === probanding">\n\n          <div class="right-bubble">\n\n            <span class="msg-name"></span>\n\n            <span class="msg-date">{{message.tiempo | tiempoDesdeAhora}}</span>\n\n           <!-- <span class="msg-date">{{message.tiempo}}</span>-->\n\n            <p text-wrap>{{message.message}}</p>\n\n          </div>\n\n        </div>\n\n\n\n        <div class="chat-message" text-left *ngIf="message.name !== probanding">\n\n          <div class="left-bubble">\n\n            <span class="msg-name">{{message.name}}</span>\n\n            <span class="msg-date">{{message.tiempo | tiempoDesdeAhora}}</span>\n\n            <p text-wrap>{{message.message}}</p>\n\n          </div>\n\n        </div>\n\n      \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    </ion-item>\n\n    \n\n\n\n\n\n\n\n  </ion-list>\n\n  \n\n\n\n</div>\n\n\n\n\n\n\n\n</ion-content>\n\n\n\n\n\n<ion-footer *ngIf="mandar">\n\n	<ion-item>\n\n		<ion-input type="text" placeholder="Escriba aquí..." [(ngModel)]="newmessage"></ion-input>\n\n		<button ion-button clear item-right (click)="send()">Enviar</button>\n\n	</ion-item>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\mapa-de-ruta\mapa-de-ruta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"]])
    ], MapaDeRutaPage);
    return MapaDeRutaPage;
}());

//# sourceMappingURL=mapa-de-ruta.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.ocultarSpinner = true;
        this.firebase = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.tipo = this.usuario.tipo;
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var date, nombreFoto, options, result, foto, pictures_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        foto = "data:image/jpeg;base64," + result;
                        pictures_1 = this.firebase.storage().ref("usuarios/" + nombreFoto);
                        this.ocultarSpinner = false;
                        pictures_1.putString(foto, "data_url").then(function () {
                            pictures_1.getDownloadURL().then(function (url) {
                                var usuariosRef = _this.firebase.database().ref("usuarios");
                                usuariosRef.once("value", function (snap) {
                                    var data = snap.val();
                                    for (var item in data) {
                                        if (data[item].correo == _this.usuario.correo) {
                                            usuariosRef.child(item).update({
                                                img: url
                                            }).then(function () {
                                                _this.usuario.img = url;
                                                localStorage.setItem("usuario", JSON.stringify(_this.usuario));
                                                localStorage.setItem("refrescarImagen", "true");
                                                _this.ocultarSpinner = true;
                                            });
                                            break;
                                        }
                                    }
                                });
                            });
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PerfilPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\perfil\perfil.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <!-- <ion-title>{{usuario.tipo}}</ion-title> -->\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div class="vertical-container">\n\n\n\n    <h2>Tu perfil</h2>\n\n\n\n    <div style="position: relative;">\n\n      <button ion-button color="dark" class="editar" (click)="SacarFoto()">\n\n        <ion-icon name="create"></ion-icon>\n\n      </button>\n\n      <img src={{usuario.img}}>\n\n    </div>\n\n\n\n    <div class="datos">\n\n\n\n      <span class="titulo">Datos:</span>\n\n\n\n      <ng-container *ngIf="tipo == \'cliente\' || tipo == \'anonimo\'; else otros">\n\n        <ng-container *ngIf="tipo == \'cliente\'; else anonimo">\n\n\n\n          <span><span>Nombre:</span> {{usuario.nombre}}</span>\n\n          <span><span>Apellido:</span> {{usuario.apellido}} </span>\n\n          <span><span>Correo:</span> {{usuario.correo}} </span>\n\n          <span><span>DNI:</span> {{usuario.dni}} </span>\n\n\n\n        </ng-container>\n\n\n\n        <ng-template #anonimo>\n\n\n\n          <span><span>Nombre:</span> {{usuario.nombre}}</span>\n\n\n\n        </ng-template>\n\n      </ng-container>\n\n\n\n      <ng-template #otros>\n\n\n\n        <span><span>Nombre:</span> {{usuario.nombre}}</span>\n\n        <span><span>Apellido:</span> {{usuario.apellido}} </span>\n\n        <span><span>Correo:</span> {{usuario.correo}} </span>\n\n        <span><span>DNI:</span> {{usuario.dni}} </span>\n\n        <span><span>CUIL:</span> {{usuario.cuil}} </span>\n\n        <span><span>Tipo:</span> {{usuario.tipo}} </span>\n\n\n\n      </ng-template>\n\n\n\n\n\n      <!-- <span><span>Nombre:</span> Rosalinda</span>\n\n      <span><span>Apellido:</span> Petra </span>\n\n      <span><span>Tipo:</span> cliente </span>\n\n      <span><span>DNI:</span> 123456789 </span>\n\n      <span><span>CUIL:</span> ..... </span>\n\n      <span><span>Clave:</span> {{claveOculta}}  &nbsp;<button ion-button clear (mousedown)="MostrarClave()" (mouseup)="VolverAOcultar()"><ion-icon name="eye"></ion-icon></button></span> -->\n\n\n\n      <!-- <ng-container *ngFor="let item of datos">\n\n\n\n        <ng-container *ngIf="item.clave != \'img\'">\n\n          <span><span>{{item.clave}}:</span> {{item.valor}}</span>\n\n        </ng-container>\n\n\n\n      </ng-container> -->\n\n\n\n    </div>\n\n\n\n  </div>\n\n\n\n  <app-spinner [ngClass]="{\'ocultar\':ocultarSpinner}"></app-spinner>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, navParams, viewCtrl, splashScreen, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
        this.nativeAudio = nativeAudio;
        this.nativeAudio.preloadSimple('z', 'assets/imgs/gamma/aud.mp3').catch(function () { });
    }
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            if (localStorage.getItem("sonidos") != "false") {
                _this.nativeAudio.play('z').catch(function () { });
            }
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-splash',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\splash\splash.html"*/'<!--\n\n  Generated template for the SplashPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>splash</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>-->\n\n\n\n<ion-content class="parent">\n\n \n\n  <!--<img class="image2" src="assets/imgs/gamma/dssda.jpg">-->\n\n \n\n  <img class="image" src="assets/imgs/gamma/imagen.png">\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 274;

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/alta-de-mesa/alta-de-mesa.module": [
		818,
		20
	],
	"../pages/alta-duenio-supervisor/alta-duenio-supervisor.module": [
		809,
		19
	],
	"../pages/alta-empleado/alta-empleado.module": [
		819,
		18
	],
	"../pages/cuenta/cuenta.module": [
		820,
		17
	],
	"../pages/encuesta-de-empleado/encuesta-de-empleado.module": [
		821,
		16
	],
	"../pages/encuesta-supervisor/encuesta-supervisor.module": [
		810,
		15
	],
	"../pages/juego-dos/juego-dos.module": [
		811,
		14
	],
	"../pages/juego-uno/juego-uno.module": [
		822,
		13
	],
	"../pages/juego/juego.module": [
		823,
		12
	],
	"../pages/listado-reservas/listado-reservas.module": [
		812,
		11
	],
	"../pages/listado-supervisor/listado-supervisor.module": [
		824,
		10
	],
	"../pages/login/login.module": [
		825,
		9
	],
	"../pages/mapa-de-ruta/mapa-de-ruta.module": [
		826,
		8
	],
	"../pages/mis-reservas/mis-reservas.module": [
		813,
		7
	],
	"../pages/perfil/perfil.module": [
		814,
		6
	],
	"../pages/principal/principal.module": [
		827,
		5
	],
	"../pages/qr-de-la-mesa/qr-de-la-mesa.module": [
		828,
		4
	],
	"../pages/reserva/reserva.module": [
		815,
		3
	],
	"../pages/sala-de-juegos/sala-de-juegos.module": [
		816,
		2
	],
	"../pages/splash/splash.module": [
		817,
		1
	],
	"../pages/tomar-pedido/tomar-pedido.module": [
		829,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 317;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificarTipoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_alta_duenio_supervisor_alta_duenio_supervisor__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_alta_empleado_alta_empleado__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_listado_supervisor_listado_supervisor__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_reserva_reserva__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_cuenta_cuenta__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_listado_reservas_listado_reservas__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sala_de_juegos_sala_de_juegos__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_registro_cliente_registro_cliente__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_alta_platos_alta_platos__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_qr_ingreso_local_qr_ingreso_local__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_encuesta_cliente_encuesta_cliente__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_pedir_platos_pedir_platos__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_alta_de_mesa_alta_de_mesa__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_qr_de_la_mesa_qr_de_la_mesa__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tomar_pedido_tomar_pedido__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_mapa_de_ruta_mapa_de_ruta__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var VerificarTipoProvider = /** @class */ (function () {
    function VerificarTipoProvider() {
        console.log('Hello VerificarTipoProvider Provider');
    }
    VerificarTipoProvider.prototype.RetornarAcciones = function () {
        var acciones = [];
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        switch (usuario.tipo) {
            case "dueño":
                acciones = [
                    { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: __WEBPACK_IMPORTED_MODULE_1__pages_alta_duenio_supervisor_alta_duenio_supervisor__["a" /* AltaDuenioSupervisorPage */] },
                    { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: __WEBPACK_IMPORTED_MODULE_2__pages_alta_empleado_alta_empleado__["a" /* AltaEmpleadoPage */] },
                    { accion: "Nueva mesa", img: "ocupar-mesa.jpg", ruta: __WEBPACK_IMPORTED_MODULE_13__pages_alta_de_mesa_alta_de_mesa__["a" /* AltaDeMesaPage */] }
                ];
                break;
            case "supervisor":
                acciones = [
                    { accion: "Confirmar reservas", img: "reserva.jpg", ruta: __WEBPACK_IMPORTED_MODULE_6__pages_listado_reservas_listado_reservas__["a" /* ListadoReservasPage */] },
                    { accion: "Agregar un dueño o supervisor", img: "nuevo-duenio-supervisor.jpg", ruta: __WEBPACK_IMPORTED_MODULE_1__pages_alta_duenio_supervisor_alta_duenio_supervisor__["a" /* AltaDuenioSupervisorPage */] },
                    { accion: "Agregar un empleado", img: "nuevo-empleado.jpg", ruta: __WEBPACK_IMPORTED_MODULE_2__pages_alta_empleado_alta_empleado__["a" /* AltaEmpleadoPage */] },
                    { accion: "Confeccionar y ver encuestas", img: "encuesta.jpg", ruta: __WEBPACK_IMPORTED_MODULE_3__pages_listado_supervisor_listado_supervisor__["a" /* ListadoSupervisorPage */] }
                ];
                break;
            case "mozo":
                acciones = [
                    { accion: "Ocupar una mesa", img: "ocupar-mesa.jpg", ruta: __WEBPACK_IMPORTED_MODULE_14__pages_qr_de_la_mesa_qr_de_la_mesa__["a" /* QrDeLaMesaPage */] },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_12__pages_pedir_platos_pedir_platos__["a" /* PedirPlatosPage */] },
                    { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: __WEBPACK_IMPORTED_MODULE_8__pages_registro_cliente_registro_cliente__["a" /* RegistroClientePage */] }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
                ];
                break;
            case "cocinero":
                acciones = [
                    { accion: "Tomar un pedido", img: "pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_15__pages_tomar_pedido_tomar_pedido__["a" /* TomarPedidoPage */] },
                    { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: __WEBPACK_IMPORTED_MODULE_9__pages_alta_platos_alta_platos__["a" /* AltaPlatosPage */] }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: EncuestaDeEmpleadoPage }
                ];
                break;
            case "bartender":
                acciones = [
                    { accion: "Tomar un pedido", img: "pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_15__pages_tomar_pedido_tomar_pedido__["a" /* TomarPedidoPage */] },
                    { accion: "Agregar un plato o bebida", img: "nueva-comida.jpg", ruta: __WEBPACK_IMPORTED_MODULE_9__pages_alta_platos_alta_platos__["a" /* AltaPlatosPage */] }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
                ];
                break;
            case "metre":
                acciones = [
                    { accion: "Agregar un cliente", img: "nuevo-cliente.jpg", ruta: __WEBPACK_IMPORTED_MODULE_8__pages_registro_cliente_registro_cliente__["a" /* RegistroClientePage */] }
                    // { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: "./" }
                ];
                break;
            case "repartidor":
                acciones = [
                    { accion: "Mapa de ruta", img: "mapa.jpg", ruta: __WEBPACK_IMPORTED_MODULE_16__pages_mapa_de_ruta_mapa_de_ruta__["a" /* MapaDeRutaPage */] }
                ];
                break;
            case "cliente":
                acciones = [
                    { accion: "Pagar", img: "propina.jpg", ruta: __WEBPACK_IMPORTED_MODULE_5__pages_cuenta_cuenta__["a" /* CuentaPage */] },
                    { accion: "Ingresar al local", img: "entrada.jpg", ruta: __WEBPACK_IMPORTED_MODULE_10__pages_qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */] },
                    { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_14__pages_qr_de_la_mesa_qr_de_la_mesa__["a" /* QrDeLaMesaPage */] },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_12__pages_pedir_platos_pedir_platos__["a" /* PedirPlatosPage */] },
                    { accion: "Confeccionar encuesta", img: "encuesta.jpg", ruta: __WEBPACK_IMPORTED_MODULE_11__pages_encuesta_cliente_encuesta_cliente__["a" /* EncuestaClientePage */] },
                    { accion: "Reservar", img: "reserva.jpg", ruta: __WEBPACK_IMPORTED_MODULE_4__pages_reserva_reserva__["a" /* ReservaPage */] },
                    { accion: "Juegos", img: "juegos.jpg", ruta: __WEBPACK_IMPORTED_MODULE_7__pages_sala_de_juegos_sala_de_juegos__["a" /* SalaDeJuegosPage */] },
                    { accion: "Hablar con el repartidor", img: "chat.jpg", ruta: __WEBPACK_IMPORTED_MODULE_16__pages_mapa_de_ruta_mapa_de_ruta__["a" /* MapaDeRutaPage */] }
                ];
                break;
            case "anonimo":
                acciones = [
                    { accion: "Pagar", img: "propina.jpg", ruta: __WEBPACK_IMPORTED_MODULE_5__pages_cuenta_cuenta__["a" /* CuentaPage */] },
                    { accion: "Ver estado del pedido", img: "estado-pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_14__pages_qr_de_la_mesa_qr_de_la_mesa__["a" /* QrDeLaMesaPage */] },
                    { accion: "Hacer un pedido", img: "pedido.jpg", ruta: __WEBPACK_IMPORTED_MODULE_12__pages_pedir_platos_pedir_platos__["a" /* PedirPlatosPage */] },
                    { accion: "Confeccionar encuesta.", img: "encuesta.jpg", ruta: __WEBPACK_IMPORTED_MODULE_11__pages_encuesta_cliente_encuesta_cliente__["a" /* EncuestaClientePage */] },
                    { accion: "Juegos", img: "juegos.jpg", ruta: __WEBPACK_IMPORTED_MODULE_7__pages_sala_de_juegos_sala_de_juegos__["a" /* SalaDeJuegosPage */] }
                ];
                break;
        }
        return acciones;
    };
    VerificarTipoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], VerificarTipoProvider);
    return VerificarTipoProvider;
}());

//# sourceMappingURL=verificar-tipo.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AltaPlatosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__encuesta_de_empleado_encuesta_de_empleado__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









/**
 * Generated class for the AltaPlatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AltaPlatosPage = /** @class */ (function () {
    function AltaPlatosPage(navCtrl, navParams, camera, aut, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.aut = aut;
        this.barcodeScanner = barcodeScanner;
        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
        this.cocineroBebida = false;
        this.bloquearBotones = false;
        this.esCocinero = false;
        this.esBartender = false;
        this.ocultarQr = true;
        this.mostrarAlert3 = false;
        this.tipoBebida = "";
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.mostrarSpinner = false;
        this.ocultar = false;
        this.mostrar = false;
        this.mostrarbtn1 = true;
        this.mostrarbtn2 = true;
        this.mostrarbtn3 = true;
        this.mostrarfoto1 = false;
        this.mostrarfoto2 = false;
        this.mostrarfoto3 = false;
        this.ocultarTiempo = false;
        this.carga = "platos";
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        //Descomentar esta linea antes de hacer el push
        this.tipo = localStorage.getItem("usuario");
        this.tipo = JSON.parse(this.tipo).tipo;
        this.cantMostrar = "grs";
        //this.tipo ="cocinero";
        if (this.tipo == "cocinero") {
            this.esCocinero = true;
        }
        else {
            this.esBartender = true;
            this.ocultarTiempo = true;
        }
        //BORRAR ESTA LINEA ANTES DE HACER EL PUSH.
        //this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
    }
    AltaPlatosPage.prototype.ionViewDidLoad = function () {
        // AngularFireModule.initializeApp(firebaseConfig.fire);
        console.log('ionViewDidLoad AltaPlatosPage');
    };
    AltaPlatosPage.prototype.pedido = function () {
        /*if(this.tipo=="cocinero")
        {
          this.tipo="bartender";
          this.esCocinero=false;
          this.esBartender=true;
         
        }
        else
        {
          this.tipo="cocinero";
          this.esBartender=false;
          this.esCocinero=true;
         
        }
      
    */
    };
    AltaPlatosPage.prototype.opcion = function (valor) {
        if (valor == "salir") {
            return;
        }
        if (this.carga == "platos") {
            this.cantMostrar = "grs";
            this.ocultarTiempo = false;
            this.cocineroBebida = false;
            this.tiempo = "";
            this.precio = "";
            this.cantidad = "";
            this.nombre = "";
            this.descripcion = "";
            this.ocultarQr = true;
            this.mostrarbtn1 = true;
            this.mostrarfoto1 = false;
            this.mostrarbtn2 = true;
            this.mostrarfoto2 = false;
            this.mostrarbtn3 = true;
            this.mostrarfoto3 = false;
        }
        if (this.carga == "bebidas") {
            this.cantMostrar = "cent. cúbicos";
            this.ocultarTiempo = true;
            this.cocineroBebida = true;
            this.tiempo = "";
            this.precio = "";
            this.cantidad = "";
            this.nombre = "";
            this.descripcion = "";
            this.ocultarQr = false;
            this.mostrarbtn1 = true;
            this.mostrarfoto1 = false;
            this.mostrarbtn2 = true;
            this.mostrarfoto2 = false;
            this.mostrarbtn3 = true;
            this.mostrarfoto3 = false;
        }
    };
    AltaPlatosPage.prototype.Fotos = function () {
        this.ocultar = true;
        this.mostrar = true;
    };
    AltaPlatosPage.prototype.Atras = function () {
        this.navCtrl.pop();
    };
    AltaPlatosPage.prototype.LeerQr = function () {
        var _this = this;
        this.options = { prompt: "Escaneá el qr del producto", formats: 'QR_CODE' };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            var texto = (barcodeData.text);
            var miScan = (texto).split('@');
            if (miScan[5] == undefined) {
                _this.mensaje = "QR no válido";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                }, 3000);
                return;
            }
            if (miScan[5] != "true") {
                _this.mensaje = "QR no válido";
                _this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                }, 3000);
                return;
            }
            _this.nombre = miScan[0];
            _this.descripcion = miScan[1];
            _this.cantidad = miScan[3];
            _this.precio = miScan[4];
            //  this.tipoBebida=miScan[6];
        });
    };
    AltaPlatosPage.prototype.Cancelar = function () {
        if (this.bloquearBotones) {
            return;
        }
        this.ocultar = false;
        this.mostrar = false;
        this.mostrarbtn1 = true;
        this.mostrarfoto1 = false;
        this.mostrarbtn2 = true;
        this.mostrarfoto2 = false;
        this.mostrarbtn3 = true;
        this.mostrarfoto3 = false;
    };
    AltaPlatosPage.prototype.tomarFoto1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.bloquearBotones) {
                    return [2 /*return*/];
                }
                try {
                    this.camera.getPicture({
                        quality: 50,
                        destinationType: this.camera.DestinationType.DATA_URL,
                        targetWidth: 400,
                        targetHeight: 400,
                        encodingType: this.camera.EncodingType.JPEG,
                        mediaType: this.camera.MediaType.PICTURE
                    }).then(function (imageData) {
                        _this.foto1 = "data:image/jpeg;base64," + imageData;
                        _this.mostrarbtn1 = false;
                        _this.mostrarfoto1 = true;
                    }, function (err) {
                        console.log(err);
                    });
                }
                catch (err) {
                }
                return [2 /*return*/];
            });
        });
    };
    AltaPlatosPage.prototype.tomarFoto2 = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto2 = "data:image/jpeg;base64," + imageData;
                _this.mostrarbtn2 = false;
                _this.mostrarfoto2 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    AltaPlatosPage.prototype.tomarFoto3 = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
        try {
            this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                quality: 50,
                targetWidth: 600,
                targetHeight: 600,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto3 = "data:image/jpeg;base64," + imageData;
                _this.mostrarbtn3 = false;
                _this.mostrarfoto3 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    AltaPlatosPage.prototype.Cargar = function () {
        var _this = this;
        if (this.bloquearBotones) {
            return;
        }
        this.bloquearBotones = true;
        var carga;
        if (this.tipo == "cocinero") {
            //valido cocinero
            if (this.carga == "bebidas") {
                if (!this.nombre || !this.precio || !this.cantidad || !this.descripcion) {
                    this.mensaje = "Todos los campos son obligatorios";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                /*    if(this.tipoBebida=="")
                    {
                      this.mensaje="Debe indicar que tipo de bebida cargara";
                      this.mostrarAlert3=true;
                      setTimeout(()=>{
            
                        this.mostrarAlert3=false;
                      }, 3000);
                      return;
                    }*/
                if (!this.ValidarNumero(this.cantidad)) {
                    this.mensaje = "La cantidad ingresada debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.cantidad) > 5000) {
                    this.mensaje = "La cantidad ingresada es demasiado alta";
                    this.cantidad = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.precio)) {
                    this.mensaje = "El precio ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.precio) > 5000) {
                    this.mensaje = "El precio ingresado es demasiado alto";
                    this.precio = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                    this.mensaje = "Las fotos son obligatorias";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                //valido los campos de cocinero para bebidas
            }
            else {
                if (!this.nombre || !this.precio || !this.cantidad || !this.tiempo || !this.descripcion) {
                    this.mensaje = "Todos los campos son obligatorios";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.cantidad)) {
                    this.mensaje = "La cantidad ingresada debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.precio)) {
                    this.mensaje = "El precio ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (!this.ValidarNumero(this.tiempo)) {
                    this.mensaje = "El tiempo ingresado debe ser un numero";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.cantidad) > 5000) {
                    this.mensaje = "La cantidad ingresada es demasiado alta";
                    this.cantidad = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.precio) > 5000) {
                    this.mensaje = "El precio ingresado es demasiado alto";
                    this.precio = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (parseInt(this.tiempo) > 150) {
                    this.mensaje = "El tiempo ingresado es demasiado alto";
                    this.tiempo = undefined;
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
                if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                    this.mensaje = "Las fotos son obligatorias";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                        _this.bloquearBotones = false;
                    }, 3000);
                    return;
                }
            }
            this.mostrarSpinner = true;
            var pedidoRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("platos");
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                var esValido = true;
                for (var item in data) {
                    if (_this.carga == "bebidas") {
                        if (data[item].carga.nombre == _this.nombre) {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "La bebida que intenta cargar ya esta existe intente con otro nombre.";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                            esValido = false;
                        }
                    }
                    else {
                        if (data[item].carga.nombre == _this.nombre) {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "El nombre del plato   que intenta cargar ya existe  intente con otro nombre.";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                            esValido = false;
                            break;
                        }
                    }
                }
                if (esValido) {
                    if (_this.carga == "bebidas") {
                        carga =
                            {
                                nombre: _this.nombre,
                                desc: _this.descripcion,
                                precio: parseFloat(_this.precio),
                                cant: parseInt(_this.cantidad),
                                foto1: _this.foto1,
                                foto2: _this.foto2,
                                foto3: _this.foto3,
                                es: "bebida",
                                para: "cocinero"
                            };
                        var mensaje = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref().child("platos");
                        mensaje.push({ carga: carga }).then(function () {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "La bebida se cargo exitósamente";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.tiempo = "";
                                _this.precio = "";
                                _this.cantidad = "";
                                _this.nombre = "";
                                _this.descripcion = "";
                                _this.tipoBebida = "";
                                _this.mostrarbtn1 = true;
                                _this.mostrarfoto1 = false;
                                _this.mostrarbtn2 = true;
                                _this.mostrarfoto2 = false;
                                _this.mostrarbtn3 = true;
                                _this.mostrarfoto3 = false;
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                        });
                    }
                    else {
                        carga =
                            {
                                nombre: _this.nombre,
                                desc: _this.descripcion,
                                precio: parseFloat(_this.precio),
                                cant: parseInt(_this.cantidad),
                                tiempo: parseInt(_this.tiempo),
                                foto1: _this.foto1,
                                foto2: _this.foto2,
                                foto3: _this.foto3,
                                es: "plato",
                                para: "cocinero"
                            };
                        var mensaje = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref().child("platos");
                        mensaje.push({ carga: carga }).then(function () {
                            _this.mostrarSpinner = false;
                            _this.mensaje = "El plato se cargo exitósamente";
                            _this.mostrarAlert3 = true;
                            setTimeout(function () {
                                _this.tiempo = "";
                                _this.precio = "";
                                _this.cantidad = "";
                                _this.nombre = "";
                                _this.descripcion = "";
                                _this.tipoBebida = "";
                                _this.mostrarbtn1 = true;
                                _this.mostrarfoto1 = false;
                                _this.mostrarbtn2 = true;
                                _this.mostrarfoto2 = false;
                                _this.mostrarbtn3 = true;
                                _this.mostrarfoto3 = false;
                                _this.mostrarAlert3 = false;
                                _this.bloquearBotones = false;
                            }, 3000);
                        });
                    }
                }
            });
        }
        else {
            //VALIDO TODO LO DEL BARTENDER!!!!!!
            if (!this.nombre || !this.precio || !this.cantidad || !this.descripcion) {
                this.mensaje = "Todos los campos son obligatorios";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (!this.ValidarNumero(this.precio)) {
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (parseInt(this.precio) > 5000) {
                this.mensaje = "El precio ingresado es demasiado alto";
                this.precio = undefined;
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (!this.ValidarNumero(this.cantidad)) {
                this.mensaje = "La cántidad ingresado debe ser un número";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (parseInt(this.cantidad) > 3000) {
                this.mensaje = "Los centímetros cúbicos  ingresados son demasiados";
                this.cantidad = undefined;
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            if (this.foto1 === "" || this.foto2 == "" || this.foto3 == "") {
                this.mensaje = "Las fotos son obligatorias";
                this.mostrarAlert3 = true;
                setTimeout(function () {
                    _this.mostrarAlert3 = false;
                    _this.bloquearBotones = false;
                }, 3000);
                return;
            }
            //VALIDO EL NOMBRE EN LA BASE DE DATOS
            this.mostrarSpinner = true;
            var pedidoRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref("platos");
            pedidoRef.once("value", function (snap) {
                var data = snap.val();
                var esValido = true;
                for (var item in data) {
                    if (data[item].carga.nombre == _this.nombre) {
                        _this.mostrarSpinner = false;
                        _this.mensaje = "El nombre de la bebida o trago que intenta cargar ya existe  utilize otro por favor.";
                        _this.mostrarAlert3 = true;
                        setTimeout(function () {
                            _this.mostrarAlert3 = false;
                            _this.bloquearBotones = false;
                        }, 3000);
                        esValido = false;
                        break;
                    }
                }
                if (esValido) {
                    carga =
                        {
                            nombre: _this.nombre,
                            desc: _this.descripcion,
                            precio: parseFloat(_this.precio),
                            cant: parseInt(_this.cantidad),
                            foto1: _this.foto1,
                            foto2: _this.foto2,
                            foto3: _this.foto3,
                            es: "bebida",
                            para: "bartender"
                        };
                    var mensaje = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref().child("platos");
                    mensaje.push({ carga: carga }).then(function () {
                        _this.mostrarSpinner = false;
                        _this.mensaje = "La bebida se cargo exitósamente";
                        _this.mostrarAlert3 = true;
                        setTimeout(function () {
                            _this.tiempo = "";
                            _this.precio = "";
                            _this.cantidad = "";
                            _this.nombre = "";
                            _this.descripcion = "";
                            _this.mostrarbtn1 = true;
                            _this.mostrarfoto1 = false;
                            _this.mostrarbtn2 = true;
                            _this.mostrarfoto2 = false;
                            _this.mostrarbtn3 = true;
                            _this.mostrarfoto3 = false;
                            _this.tipoBebida = "";
                            _this.mostrarAlert3 = false;
                            _this.bloquearBotones = false;
                        }, 3000);
                    });
                }
            });
            //VALIDO TOOD LO DEL BARTENDER:
        }
        /*  else
          {
            carga =
        {
          nombre:this.nombre,
          desc:this.descripcion,
          precio:parseFloat(this.precio),
          cant:parseInt(this.cantidad),
          tiempo:parseInt(this.tiempo),
        foto1:this.foto1,
          foto2:this.foto2,
          foto3:this.foto3,
          es:"plato",
          para:"cocinero"
        };
  
          }
          let mensaje = firebase.database().ref().child("platos");
          mensaje.push({carga});
  
        }
        else
        {
          //Valido bartender
          carga =
        {
          nombre:this.nombre,
          desc:this.descripcion,
          precio:this.precio,
          cant:this.cantidad,
          es:"bebida",
          foto1:this.foto1,
          foto2:this.foto2,
          foto3:this.foto3,
          para:"bartender"
      
        };
  
        }
  
      
  
      
          let mensaje = firebase.database().ref().child("platos");
        mensaje.push({carga});
  
  
  */
    };
    AltaPlatosPage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    AltaPlatosPage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        if (_this.usuario.tipo == "mozo"
                            || _this.usuario.tipo == "cocinero"
                            || _this.usuario.tipo == "bartender"
                            || _this.usuario.tipo == "metre"
                            || _this.usuario.tipo == "repartidor") {
                            // Para redireccionar a la encuesta de axel.
                            localStorage.setItem("desloguear", "true");
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */]);
                        }
                        else {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
                        }
                    });
                    break;
                }
            }
        });
    };
    AltaPlatosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-alta-platos',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-platos\alta-platos.html"*/'<!--\n\n  Generated template for the AltaPlatosPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<div class="alert3" [ngClass]="{\'mostrarAlert3\':mostrarAlert3}">\n\n    <h1>{{mensaje}}</h1>\n\n  </div>\n\n<ion-header>\n\n  <ion-navbar color="dark"  hideBackButton="true">\n\n\n\n  \n\n      <ion-buttons start style="left: 3px;\n\n      position: absolute;">\n\n        <button ion-button (click)="Atras()">\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    <!-- <ion-title>{{sala}}</ion-title> -->\n\n    <!-- <p class="subtitle" style="color: white;">{{usuario.mail}}</p> -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button>\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n  <ion-menu [content]="content">\n\n    <ion-header>\n\n      <ion-toolbar color="dark">\n\n        <ion-title>Menú</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content>\n\n      <ion-list>\n\n        <button ion-item>\n\n            <i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Convencional\n\n        </button>\n\n        <button ion-item>\n\n          Friends\n\n        </button>\n\n        <button ion-item>\n\n          Events\n\n        </button>\n\n        <button ion-item >\n\n          Close Menu\n\n        </button>\n\n      </ion-list>\n\n    </ion-content>\n\n  </ion-menu>\n\n\n\n  <ion-nav #content swipeBackEnabled="false"></ion-nav>\n\n\n\n\n\n\n\n<ion-content >\n\n\n\n\n\n{{error}}\n\n<div class="paraCocinero" *ngIf="esCocinero" >\n\n\n\n  <div class="contenido" [ngClass]="{\'ocultar\':ocultar}">\n\n    <h1 class="titulo">Alta de platos y bebidas.</h1>\n\n    <h2 class="tituloCheck">¿Qu&eacute; desea cargar?</h2>\n\n    <div class="opciones" radio-group [(ngModel)]="carga"> \n\n            \n\n          <div class="opcion2">\n\n                    <ion-label for="radio1">Bebida</ion-label>\n\n                    <ion-radio id="radio1" value="bebidas" (ionSelect)="opcion()"></ion-radio>\n\n        \n\n          </div>\n\n          <div class="opcion1">\n\n              <ion-label for="radio2"> Plato</ion-label>\n\n              <ion-radio id="radio2" value="platos"  (ionSelect)="opcion()"></ion-radio>\n\n        </div>\n\n  </div>\n\n  <!--h2 class="tituloCheck"  *ngIf="cocineroBebida">¿Qu&eacute; bebida cargara?</h2>\n\n  <div class="opcionesBebidas" radio-group [(ngModel)]="tipoBebida" *ngIf="cocineroBebida"> \n\n          \n\n        <div class="bebidaOpcion1">\n\n                  <ion-label for="radio1">Agua</ion-label>\n\n                  <ion-radio id="radio1" value="agua" (ionSelect)="opcion(\'salir\')"></ion-radio>\n\n      \n\n        </div>\n\n        <div class="bebidaOpcion2">\n\n            <ion-label for="radio2"> jugo</ion-label>\n\n            <ion-radio id="radio2" value="jugo"  (ionSelect)="opcion(\'salir\')"></ion-radio>\n\n      </div>\n\n      <div class="bebidaOpcion3">\n\n          <ion-label for="radio2"> Gaseosa</ion-label>\n\n          <ion-radio id="radio2" value="gaseosa"  (ionSelect)="opcion(\'salir\')"></ion-radio>\n\n    </div>\n\n</div-->\n\n\n\n  <input class="nombrePlato" type="text" [(ngModel)]="nombre" placeholder="Nombre ">\n\n  <textarea class="descripcion" [(ngModel)]="descripcion" placeholder="Descripci&oacute;n..."></textarea>\n\n <div class="tiempoDiv" [ngClass]="{\'ocultar\':ocultarTiempo}"> <input class="tiempo"  [(ngModel)]="tiempo" type="text" ><label class="tiempoLabel">mins de elaboraci&oacute;n</label>\n\n  </div>  \n\n  <div class="tiempoDiv"> <input class="tiempo" type="text" [(ngModel)]="cantidad" ><label class="tiempoLabel">Cantidad de {{cantMostrar}}</label>\n\n  </div>  \n\n  <div class="precioDiv"> <label class="precioLabel">$</label><input [(ngModel)]="precio" class="precio" type="text"> <label class="tiempoLabel">Precio</label>\n\n    <button ion-button color="dark"  [ngClass]="{\'ocultar\':ocultarQr}"(click)="LeerQr()" outline class="Qr1">Leer QR</button>\n\n \n\n  </div>  \n\n \n\n\n\n \n\n    <div class="elContenido" >\n\n       <img class="spinnerPropio" *ngIf="mostrarSpinner" src="assets/imgs/spinner.gif" />\n\n      <h1 class="titulo">Fotos</h1>\n\n      <button ion-button color="dark"   [ngClass]="{\'mostrarBoton\':mostrarbtn1}" (click)="tomarFoto1()" class="Foto1">  <ion-icon ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n      <img class="laFoto1" [src]="foto1" [ngClass]="{\'mostrarLaFoto\':mostrarfoto1}" >\n\n      <button ion-button color="dark" [ngClass]="{\'mostrarBoton\':mostrarbtn2}" (click)="tomarFoto2()" class="Foto2">   <ion-icon ios="ios-camera" md="md-camera"></ion-icon></button>\n\n      <img class="laFoto2" [src]="foto2"  [ngClass]="{\'mostrarLaFoto\':mostrarfoto2}">\n\n      <button ion-button color="dark"  [ngClass]="{\'mostrarBoton\':mostrarbtn3}" (click)="tomarFoto3()" class="Foto3">  <ion-icon ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n      <img class="laFoto3" [src]="foto3" [ngClass]="{\'mostrarLaFoto\':mostrarfoto3}">\n\n      <div class="botones">\n\n    \n\n\n\n          <button ion-button color="dark" (click)="Cargar()"  class="TomarFotos"> Cargar</button>\n\n          <button ion-button color="dark" (click)="Cancelar()" class="Qr">Cancelar</button>\n\n        \n\n        </div>\n\n       \n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n<div class="paraBartender"  *ngIf="esBartender">\n\n  <div class="contenido" [ngClass]="{\'ocultar\':ocultar}">\n\n    <h1 class="titulo">Alta de  bebidas y/o tragos.</h1>\n\n    \n\n         \n\n  </div>\n\n  <input class="nombrePlato" type="text" [(ngModel)]="nombre" placeholder="Nombre de la bebida o trago">\n\n  <textarea class="descripcion" [(ngModel)]="descripcion" placeholder="Descripci&oacute;n..."></textarea>\n\n <div class="tiempoDiv" [ngClass]="{\'ocultar\':ocultarTiempo}"> <input class="tiempo"  [(ngModel)]="tiempo"   type="text" ><label class="tiempoLabel">mins de elaboraci&oacute;n</label>\n\n  </div>  \n\n  <div class="tiempoDiv"> <input class="tiempo" type="text" [(ngModel)]="cantidad" ><label class="tiempoLabel">Cantidad de cent cúbicos.</label>\n\n  </div>  \n\n  <div class="precioDiv"> <label class="precioLabel">$</label><input [(ngModel)]="precio" class="precio" type="text" ><label class="tiempoLabel">Precio</label>\n\n    <button ion-button color="dark" (click)="LeerQr()" outline class="Qr1">Leer QR</button>\n\n \n\n  </div>  \n\n \n\n\n\n \n\n    <div class="elContenido" >\n\n        <img class="spinnerPropio altura" *ngIf="mostrarSpinner" src="assets/imgs/spinner.gif" />\n\n        <h1 class="titulo">Fotos</h1>\n\n      <button ion-button color="dark"   [ngClass]="{\'mostrarBoton\':mostrarbtn1}" (click)="tomarFoto1()" class="Foto1">  <ion-icon ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n      <img class="laFoto1" [src]="foto1" [ngClass]="{\'mostrarLaFoto\':mostrarfoto1}" >\n\n      <button ion-button color="dark" [ngClass]="{\'mostrarBoton\':mostrarbtn2}" (click)="tomarFoto2()" class="Foto2">   <ion-icon ios="ios-camera" md="md-camera"></ion-icon></button>\n\n      <img class="laFoto2" [src]="foto2"  [ngClass]="{\'mostrarLaFoto\':mostrarfoto2}">\n\n      <button ion-button color="dark"  [ngClass]="{\'mostrarBoton\':mostrarbtn3}" (click)="tomarFoto3()" class="Foto3">  <ion-icon ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n      <img class="laFoto3" [src]="foto3" [ngClass]="{\'mostrarLaFoto\':mostrarfoto3}">\n\n      <div class="botones">\n\n\n\n          <button ion-button color="red" (click)="Cargar()"  class="TomarFotos"> Cargar</button>\n\n          <button ion-button color="red" (click)="Cancelar()" class="Qr">Cancelar</button>\n\n        \n\n        </div>\n\n    </div>\n\n\n\n\n\n  </div>\n\n\n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\alta-platos\alta-platos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], AltaPlatosPage);
    return AltaPlatosPage;
}());

//# sourceMappingURL=alta-platos.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncuestaClientePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pedir_platos_pedir_platos__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EncuestaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EncuestaClientePage = /** @class */ (function () {
    function EncuestaClientePage(navCtrl, navParams, camera, aut) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.aut = aut;
        this.firebase = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a;
        this.pregunta4Labels = ['Horribles', 'Feos', 'Pasable', 'Aceptable', 'Buenos', 'Ricos', 'Muy ricos'];
        this.pregunta4Data = [0, 0, 0, 0, 0, 0, 0];
        this.pregunta1Labels = ['Sí', 'No'];
        this.pregunta1Data = [0, 0];
        this.pregunta2Labels = ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'];
        this.pregunta2Data = [0, 0, 0, 0, 0];
        this.pregunta3Labels = ['Comodidad', 'Platos', 'Precios', 'No tienen'];
        this.pregunta3Data = [0, 0, 0, 0];
        this.pregunta5Labels = ['Puntuaron 1', ' Puntuaron 2', ' Puntuaron 3', 'Puntuaron 4', 'Puntuaron 5', 'Puntuaron 6', 'Puntuaron 7', 'Puntuaron 8', 'Puntuaron 9', 'Puntuaron 10'];
        this.pregunta5Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.doughnutChartType = 'doughnut';
        //Para los votos de la preg 
        this.movioElRange = false;
        this.votosPreg1Si = 0;
        this.votosPreg1No = 0;
        this.votosHorribles = 0;
        this.votosFeos = 0;
        this.votosPasable = 0;
        this.votosAceptable = 0;
        this.votosBuenos = 0;
        this.votosRicos = 0;
        this.votosMuyRicos = 0;
        this.votos1 = 0;
        this.votos2 = 0;
        this.votos3 = 0;
        this.votos4 = 0;
        this.votos5 = 0;
        this.votos6 = 0;
        this.votos7 = 0;
        this.votos8 = 0;
        this.votos9 = 0;
        this.votos10 = 0;
        this.votosComodidad = 0;
        this.votosAtencion = 0;
        this.votoPrecios = 0;
        this.votosPlatos = 0;
        this.votosMuyMala = 0;
        this.votosMala = 0;
        this.votosRegular = 0;
        this.votosBuena = 0;
        this.votosMuyBuena = 0;
        this.resp3comodidad = false;
        this.resp3platos = false;
        this.resp3precios = false;
        this.resp3atencion = false;
        this.resp4 = 4;
        this.resp5 = "";
        this.foto1 = "";
        this.foto2 = "";
        this.foto3 = "";
        this.mostrarAlert3 = false;
        this.mostrarChart = false;
        //Para mostrar los tildes
        this.respPreg1 = false;
        this.respPreg2 = false;
        this.respPreg3 = false;
        this.respPreg4 = false;
        this.respPreg5 = false;
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultarBoton1 = false;
        this.ocultarBoton2 = false;
        this.ocultarBoton3 = false;
        this.ocultar6 = true;
        this.correo = localStorage.getItem("usuario");
        this.correo = (JSON.parse(this.correo)).nombre;
        this.mostrarfoto1 = false;
        this.mostrarfoto2 = false;
        this.mostrarfoto3 = false;
        //setear esta variable con el cliente sacado del local storage
        //  this.cliente ="yoCliente";
        //DESCOMENTAR ESTA LINEA PARA TRABAJAR A NIVEL LOCAL!!!
        //  this.aut.auth.signInWithEmailAndPassword("example@gmail.com", "123456");
        __WEBPACK_IMPORTED_MODULE_6_chart_js__["Chart"].defaults.global.legend.display = false;
        var encuestaRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref("encuestaCliente/");
        encuestaRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                //Cargo los puntos para la pregunta 4.
                console.log(data[item].preg4);
                if (data[item].preg4 == 1) {
                    _this.votosHorribles++;
                }
                if (data[item].preg4 == 2) {
                    _this.votosFeos++;
                }
                if (data[item].preg4 == 3) {
                    _this.votosPasable++;
                }
                if (data[item].preg4 == 4) {
                    _this.votosAceptable++;
                }
                if (data[item].preg4 == 5) {
                    _this.votosBuenos++;
                }
                if (data[item].preg4 == 6) {
                    _this.votosRicos++;
                }
                if (data[item].preg4 == 7) {
                    _this.votosMuyRicos++;
                }
                //Cargo los puntos para pregunta 1
                if (data[item].preg1 == "Si") {
                    _this.votosPreg1Si++;
                }
                else {
                    _this.votosPreg1No++;
                }
                //Cargo los puntos para pregunta 2
                if (data[item].preg2 == "muy mala") {
                    _this.votosMuyMala++;
                }
                if (data[item].preg2 == "mala") {
                    _this.votosMala++;
                }
                if (data[item].preg2 == "muy buena") {
                    _this.votosMuyBuena++;
                }
                if (data[item].preg2 == "buena") {
                    _this.votosBuena++;
                }
                if (data[item].preg2 == "regular") {
                    _this.votosRegular++;
                }
                //Valido pregunta 3
                var resp3 = data[item].preg3.split("-");
                if (resp3[0] == "true") {
                    _this.votosComodidad++;
                }
                if (resp3[1] == "true") {
                    _this.votosPlatos++;
                }
                if (resp3[2] == "true") {
                    _this.votoPrecios++;
                }
                if (resp3[3] == "true") {
                    _this.votosAtencion++;
                }
                //Valido pregunta 5
                if (data[item].preg5 == "1") {
                    _this.votos1++;
                }
                if (data[item].preg5 == "2") {
                    _this.votos2++;
                }
                if (data[item].preg5 == "3") {
                    _this.votos3++;
                }
                if (data[item].preg5 == "4") {
                    _this.votos4++;
                }
                if (data[item].preg5 == "5") {
                    _this.votos5++;
                }
                if (data[item].preg5 == "6") {
                    _this.votos6++;
                }
                if (data[item].preg5 == "7") {
                    _this.votos7++;
                }
                if (data[item].preg5 == "8") {
                    _this.votos8++;
                }
                if (data[item].preg5 == "9") {
                    _this.votos9++;
                }
                if (data[item].preg5 == "10") {
                    _this.votos10++;
                }
            }
            _this.pregunta4Data = [
                _this.votosHorribles,
                _this.votosFeos,
                _this.votosPasable,
                _this.votosAceptable,
                _this.votosBuenos,
                _this.votosRicos,
                _this.votosMuyRicos
            ];
            _this.pregunta5Data = [
                _this.votos1,
                _this.votos2,
                _this.votos3,
                _this.votos4,
                _this.votos5,
                _this.votos6,
                _this.votos7,
                _this.votos8,
                _this.votos9,
                _this.votos10,
            ];
            _this.pregunta1Data =
                [
                    _this.votosPreg1Si,
                    _this.votosPreg1No
                ];
            _this.pregunta2Data = [
                _this.votosMuyMala,
                _this.votosMala,
                _this.votosRegular,
                _this.votosBuena,
                _this.votosMuyBuena
            ];
            _this.pregunta3Data = [
                _this.votosComodidad,
                _this.votosPlatos,
                _this.votoPrecios,
                _this.votosAtencion
            ];
        });
    }
    EncuestaClientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaClientePage');
    };
    EncuestaClientePage.prototype.pregunta1 = function () {
        this.ocultar = false;
    };
    EncuestaClientePage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaClientePage.prototype.irA = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pedir_platos_pedir_platos__["a" /* PedirPlatosPage */]);
    };
    EncuestaClientePage.prototype.pregunta2 = function () {
        this.ocultar2 = false;
    };
    EncuestaClientePage.prototype.pregunta3 = function () {
        this.ocultar3 = false;
    };
    EncuestaClientePage.prototype.pregunta4 = function () {
        this.ocultar4 = false;
        console.log(this.votosAceptable);
    };
    EncuestaClientePage.prototype.pregunta5 = function () {
        this.ocultar5 = false;
    };
    EncuestaClientePage.prototype.pregunta6 = function () {
        this.ocultar6 = false;
    };
    EncuestaClientePage.prototype.Aceptar = function (valor) {
        var _this = this;
        switch (valor) {
            case "1":
                if (!this.resp1) {
                    this.mensaje = "No contestó la pregunta. Elija una opción para contestar";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "2":
                if (!this.resp2) {
                    this.mensaje = "No contestó la pregunta. Elija una  opción para contestar.";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "3":
                if (this.resp3atencion == false && this.resp3comodidad == false && this.resp3platos == false && this.resp3precios == false) {
                    this.mensaje = "No contestó la pregunta. Elija una o más opciones para contestar.";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
            case "4":
                if (!this.movioElRange) {
                    this.mensaje = "No contestó la pregunta, mueva el rango para contestar";
                    this.mostrarAlert3 = true;
                    setTimeout(function () {
                        _this.mostrarAlert3 = false;
                    }, 2000);
                    return;
                }
                break;
        }
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultar6 = true;
        console.log(this.resp1);
        console.log(this.resp2);
        console.log(this.resp3comodidad);
        console.log(this.resp3platos);
        console.log(this.resp3precios);
        console.log(this.resp3atencion);
        console.log(this.resp4);
        console.log(this.resp5);
        //Me fijo si debo poner tilde o no
        if (this.resp1) {
            this.respPreg1 = false;
        }
        if (this.resp2) {
            this.respPreg2 = false;
        }
        if (this.resp3atencion) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3comodidad) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3platos) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.resp3precios) {
            console.log("Se tendria que dejar de mostrar la cruz");
            this.respPreg3 = false;
        }
        if (this.movioElRange) {
            this.respPreg4 = false;
        }
    };
    EncuestaClientePage.prototype.cerrarPregunta = function () {
        this.ocultar = true;
        this.ocultar2 = true;
        this.ocultar3 = true;
        this.ocultar4 = true;
        this.ocultar5 = true;
        this.ocultar6 = true;
    };
    EncuestaClientePage.prototype.Aceptar5 = function () {
        var _this = this;
        if (!this.resp5) {
            this.mensaje = "No contesto la pregunta.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 2000);
            return;
        }
        if (!this.ValidarNumero(this.resp5)) {
            this.mensaje = "Debe ingresar un número en este campo.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3500);
            return;
        }
        var valor = parseInt(this.resp5);
        if (valor < 1 || valor > 10) {
            this.mensaje = "El número ingresado debe estar en el rango del 1 a 10.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3500);
            return;
        }
        this.ocultar5 = true;
        if (this.resp5) {
            this.respPreg5 = false;
        }
        console.log(this.resp3atencion);
        console.log(this.resp3platos);
        console.log(this.resp3precios);
        console.log(this.resp3comodidad);
    };
    EncuestaClientePage.prototype.Foto1 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto1 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto1 = true;
                _this.ocultarBoton1 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.Foto2 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto2 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto2 = true;
                _this.ocultarBoton2 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.Foto3 = function () {
        var _this = this;
        try {
            this.camera.getPicture({
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then(function (imageData) {
                _this.foto3 = "data:image/jpeg;base64," + imageData;
                _this.mostrarfoto3 = true;
                _this.ocultarBoton3 = true;
            }, function (err) {
                console.log(err);
            });
        }
        catch (err) {
        }
    };
    EncuestaClientePage.prototype.ValidarNumero = function (numero) {
        var arrayNumero = numero.split("");
        for (var _i = 0, arrayNumero_1 = arrayNumero; _i < arrayNumero_1.length; _i++) {
            var caracter = arrayNumero_1[_i];
            if (isNaN(parseInt(caracter))) {
                return false;
            }
        }
        return true;
    };
    EncuestaClientePage.prototype.mostrarelChart = function () {
        this.mostrarChart = true;
    };
    EncuestaClientePage.prototype.cerrarChart = function () {
        this.mostrarChart = false;
    };
    EncuestaClientePage.prototype.SubirEncuesta = function () {
        var _this = this;
        var preg3ok = true;
        var preg4ok = true;
        if (!this.resp1) {
            this.respPreg1 = true;
        }
        if (!this.resp2) {
            this.respPreg2 = true;
        }
        if (!this.movioElRange) {
            this.respPreg4 = true;
            preg4ok = false;
        }
        if (!this.resp5) {
            this.respPreg5 = true;
        }
        if (this.resp3atencion == false && this.resp3comodidad == false && this.resp3platos == false && this.resp3precios == false) {
            this.respPreg3 = true;
            preg3ok = false;
        }
        if (!this.resp1 || !this.resp2 || !preg3ok || !preg4ok || !this.resp5) {
            this.mensaje = "Debe contestar todas las preguntas para poder enviar la encuesta.";
            this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
            }, 3000);
            return;
        }
        var carga = {
            preg1: this.resp1,
            preg2: this.resp2,
            preg3: this.resp3platos + "-" + this.resp3comodidad + "-" + this.resp3precios + "-" + this.resp3atencion,
            preg4: this.resp4,
            preg5: parseInt(this.resp5),
            foto1: this.foto1,
            foto2: this.foto2,
            foto3: this.foto3,
            cliente: this.correo
        };
        var mensaje = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref().child("encuestaCliente/");
        mensaje.push(carga).then(function () {
            _this.mensaje = "Muchas gracias por hacer la encuesta.";
            _this.mostrarAlert3 = true;
            setTimeout(function () {
                _this.mostrarAlert3 = false;
                _this.Logout();
            }, 2000);
        });
    };
    EncuestaClientePage.prototype.ModificarTextoRange = function () {
        this.movioElRange = true;
        switch (this.resp4) {
            case 1:
                this.textoRange = "Horribles";
                break;
            case 2:
                this.textoRange = "Feos";
                break;
            case 3:
                this.textoRange = "Pasable";
                break;
            case 4:
                this.textoRange = "Aceptable";
                break;
            case 5:
                this.textoRange = "Buenos";
                break;
            case 6:
                this.textoRange = "Ricos";
                break;
            case 7:
                this.textoRange = "Muy Ricos";
                break;
            default:
                this.textoRange = "Algo fallo";
                break;
        }
    };
    EncuestaClientePage.prototype.Logout = function () {
        var _this = this;
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                if (data[item].correo == _this.usuario.correo) {
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        localStorage.clear();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
                    });
                    break;
                }
            }
        });
    };
    EncuestaClientePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-encuesta-cliente',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-cliente\encuesta-cliente.html"*/'<!--\n\n  Generated template for the EncuestaClientePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<div class="alert3" [ngClass]="{\'mostrarAlert3\':mostrarAlert3}">\n\n    <h1>{{mensaje}}</h1>\n\n  </div>\n\n\n\n\n\n\n\n\n\n<ion-content >\n\n       \n\n    <div class="contenido">\n\n            <div class="pregunta1"  [ngClass]="{\'noMostrar\':ocultar}">\n\n    \n\n                    <div class="laPregunta1" radio-group [(ngModel)]="resp1">\n\n                        <button ion-button class="cerrarChart" (click)="cerrarPregunta()" color="light">\n\n                            <ion-icon name="close"></ion-icon>\n\n                        </button>\n\n                        <h2 class="tituloPreg">¿Se siente c&oacute;modo en el restaurant?</h2>\n\n                       \n\n                        <ion-item>\n\n                            <ion-label style="color:black">Si</ion-label>\n\n                            <ion-radio value="Si"></ion-radio>\n\n                          </ion-item>\n\n                        \n\n                          <ion-item>\n\n                            <ion-label style="color:black">No</ion-label>\n\n                            <ion-radio value="No"></ion-radio>\n\n                          </ion-item>\n\n                          <button class="aceptar" (click)="Aceptar(\'1\')" ion-button color="dark">Aceptar</button>\n\n                          <button ion-button class="btnChart" color="dark" (click)="mostrarelChart()">\n\n                                  <ion-icon class="iconoChart" name="stats"></ion-icon>\n\n                                  </button>\n\n                          <div id="divCanvas" class="canvas" [ngClass]="{\'mostrarChart\':mostrarChart}">\n\n                                  <button ion-button class="cerrarChart" (click)="cerrarChart()" color="light">\n\n                                          <ion-icon name="close"></ion-icon>\n\n                                      </button>\n\n                                  <h2 >Gr&aacute;fico de todas las respuestas a esta pregunta</h2><br>\n\n                                 \n\n                                \n\n\n\n                                  <canvas class="altoCanvas" baseChart\n\n                                          [data]="pregunta1Data"\n\n                                          [labels]="pregunta1Labels"\n\n                                          [chartType]="doughnutChartType"\n\n                                          (chartHover)="chartHovered($event)"\n\n                                          (chartClick)="chartClicked($event)"></canvas>\n\n                                </div>\n\n                      </div>\n\n                  \n\n                  </div>\n\n                  <div class="pregunta2"  [ngClass]="{\'noMostrar\':ocultar2}">\n\n                      <div class="laPregunta2">\n\n                        <button ion-button class="cerrarChart" (click)="cerrarPregunta()" color="light">\n\n                            <ion-icon name="close"></ion-icon>\n\n                        </button>\n\n                          <h2  class="tituloPreg">¿Como calificar&iacute;a la atenci&oacute;n?</h2>\n\n                         \n\n                          <ion-item>\n\n                              <ion-label>Elija su opci&oacute;n</ion-label>\n\n                              <ion-select  okText="Ok" [(ngModel)]="resp2" cancelText="Cancelar">\n\n                                  <ion-option  value="muy mala">Muy mala</ion-option>\n\n                                  <ion-option value="mala">Mala</ion-option>\n\n                                  <ion-option value="regular">Regular</ion-option>\n\n                                  <ion-option value="buena">Buena</ion-option>\n\n                                  <ion-option value="muy buena">Muy Buena</ion-option>\n\n                                </ion-select>\n\n                            </ion-item>\n\n                            <button class="aceptar" (click)="Aceptar(\'2\')" ion-button color="dark">Aceptar</button>\n\n                            <button ion-button class="btnChart" color="dark" (click)="mostrarelChart()">\n\n                                  <ion-icon class="iconoChart" name="stats"></ion-icon>\n\n                                  </button>\n\n                            <div id="divCanvas" class="canvas" [ngClass]="{\'mostrarChart\':mostrarChart}" >\n\n                                  <button ion-button class="cerrarChart" (click)="cerrarChart()" color="light">\n\n                                  <ion-icon name="close"></ion-icon>\n\n                              </button>\n\n                                  <h2 >Gráfico de todas las respuestas a esta pregunta:</h2>\n\n                                  <canvas class="altoCanvas" baseChart\n\n                                          [data]="pregunta2Data"\n\n                                          [labels]="pregunta2Labels"\n\n                                          [chartType]="doughnutChartType"\n\n                                          (chartHover)="chartHovered($event)"\n\n                                          (chartClick)="chartClicked($event)"></canvas>\n\n                                </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="pregunta3"  [ngClass]="{\'noMostrar\':ocultar3}">\n\n                        <div class="laPregunta3">\n\n                                <button ion-button class="cerrarChart" (click)="cerrarPregunta()" color="light">\n\n                                        <ion-icon name="close"></ion-icon>\n\n                                    </button>\n\n                             \n\n                            <h2 class="tituloPreg" >¿Cu&aacute;les considera nuestros puntos fuertes?</h2>\n\n                           \n\n                            <ion-item>\n\n                                <ion-label >La comodidad del sal&oacute;n</ion-label>\n\n                              <ion-checkbox [(ngModel)]="resp3comodidad" >Si</ion-checkbox>\n\n                              \n\n                            </ion-item>\n\n                  \n\n                            <ion-item>\n\n                                <ion-label >Nuestros platos</ion-label>\n\n                              <ion-checkbox  [(ngModel)]="resp3platos" >No</ion-checkbox>\n\n                              \n\n                            </ion-item>\n\n                            <ion-item>\n\n                                  <ion-label >Nuestros precios</ion-label>\n\n                                <ion-checkbox  [(ngModel)]="resp3precios" >No</ion-checkbox>\n\n                                \n\n                              </ion-item>\n\n                              <ion-item>\n\n                                      <ion-label >No tienen</ion-label>\n\n                                    <ion-checkbox  [(ngModel)]="resp3atencion" >No</ion-checkbox>\n\n                                    \n\n                                  </ion-item>\n\n                              <button class="aceptar" (click)="Aceptar(\'3\')" ion-button color="dark">Aceptar</button>\n\n                              <button ion-button class="btnChart" color="dark" (click)="mostrarelChart()">\n\n                                      <ion-icon class="iconoChart" name="stats"></ion-icon>\n\n                                      </button>\n\n                              <div id="divCanvas" class="canvas" [ngClass]="{\'mostrarChart\':mostrarChart}">\n\n                                      <button ion-button class="cerrarChart" (click)="cerrarChart()" color="light">\n\n                                              <ion-icon name="close"></ion-icon>\n\n                                          </button>\n\n                                          <h2 >Gráfico de todas las respuestas a esta pregunta:</h2>\n\n                                      <canvas baseChart class="altoCanvas"\n\n                                              [data]="pregunta3Data"\n\n                                              [labels]="pregunta3Labels"\n\n                                              [chartType]="doughnutChartType"\n\n                                              (chartHover)="chartHovered($event)"\n\n                                              (chartClick)="chartClicked($event)"></canvas>\n\n                                    </div>\n\n                          </div>\n\n                      </div>\n\n                      <div class="pregunta4"  [ngClass]="{\'noMostrar\':ocultar4}">\n\n                          <div class="laPregunta4">\n\n                                <button ion-button class="cerrarChart" (click)="cerrarPregunta()" color="light">\n\n                                        <ion-icon name="close"></ion-icon>\n\n                                    </button>\n\n                            \n\n                              <h2 class="tituloPreg">¿Qué tan buenos son nuestros platos?</h2>\n\n                             \n\n                              <ion-item>\n\n                          \n\n                                  <ion-range  [(ngModel)]="resp4" min="1" max="7" pin="true" (ngModelChange)="ModificarTextoRange()" >\n\n                                          <ion-icon range-left  name="sad"></ion-icon>\n\n                                          <ion-icon range-right name="happy"></ion-icon>\n\n                            \n\n                          \n\n                                  </ion-range>\n\n                                  \n\n                                </ion-item>\n\n                                <span>{{textoRange}}</span>\n\n                                <button class="aceptar" (click)="Aceptar(\'4\')" ion-button color="dark">Aceptar</button>\n\n                                <button ion-button class="btnChart" color="dark" (click)="mostrarelChart()">\n\n                                      <ion-icon class="iconoChart" name="stats"></ion-icon>\n\n                                      </button>\n\n                                <div id="divCanvas" class="canvas"  [ngClass]="{\'mostrarChart\':mostrarChart}" >\n\n                                      <button ion-button class="cerrarChart" (click)="cerrarChart()" color="light">\n\n                                              <ion-icon name="close"></ion-icon>\n\n                                          </button>\n\n                                          <h2 >Gráfico de todas las respuestas a esta pregunta:</h2>\n\n                                      <canvas baseChart class="altoCanvas"\n\n                                              [data]="pregunta4Data"\n\n                                              [labels]="pregunta4Labels"\n\n                                              [chartType]="doughnutChartType"\n\n                                              (chartHover)="chartHovered($event)"\n\n                                              (chartClick)="chartClicked($event)"></canvas>\n\n                                  </div>\n\n                            </div>\n\n                        </div>\n\n                        <div class="pregunta5"  [ngClass]="{\'noMostrar\':ocultar5}">\n\n                            <div class="laPregunta5">\n\n                                    <button ion-button class="cerrarChart" (click)="cerrarPregunta()" color="light">\n\n                                            <ion-icon name="close"></ion-icon>\n\n                                        </button>\n\n                              <h2 class="tituloPreg">¿Del 1 al 10, qué puntaje le pondría a nuestro restaurante?</h2>\n\n                               \n\n                                <ion-item>\n\n                            \n\n                                    <input type="text" class="miInput" placeholder="Escríbalo aqui" [(ngModel)]="resp5">\n\n                                  </ion-item>\n\n                                  <button class="aceptar" (click)="Aceptar5(\'5\')"  ion-button color="dark">Aceptar</button>\n\n                                  <button ion-button class="btnChart" color="dark" (click)="mostrarelChart()">\n\n                                          <ion-icon class="iconoChart" name="stats"></ion-icon>\n\n                                          </button>\n\n                  \n\n                                  <div id="divCanvas" class="canvas" [ngClass]="{\'mostrarChart\':mostrarChart}">\n\n                                          <button ion-button class="cerrarChart" (click)="cerrarChart()" color="light">\n\n                                                  <ion-icon name="close"></ion-icon>\n\n                                              </button>\n\n                                              <h2 >Gráfico de todas las respuestas a esta pregunta:</h2>\n\n                                          <canvas baseChart class="altoCanvas"\n\n                                                  [data]="pregunta5Data"\n\n                                                  [labels]="pregunta5Labels"\n\n                                                  [chartType]="doughnutChartType"\n\n                                                  (chartHover)="chartHovered($event)"\n\n                                                  (chartClick)="chartClicked($event)"></canvas>\n\n                                        </div>\n\n                              </div>\n\n                          </div>\n\n                          <div class="pregunta6"  [ngClass]="{\'noMostrar\':ocultar6}">\n\n                                <button ion-button class="cerrarChartFotos" (click)="cerrarPregunta()" color="light">\n\n                                        <ion-icon name="close"></ion-icon>\n\n                                    </button>\n\n                              <div class="laPregunta6">\n\n                                \n\n                                  <h2 class="tituloPreg">Tome algunas fotos(m&aacute;ximo 3) relacionadas a sus respuestas</h2>\n\n                                 \n\n                                \n\n                              \n\n                                      <button ion-button color="dark"   (click)="Foto1()" class="Foto" [ngClass]="{\'ocultarBoton\':ocultarBoton1}" >  <ion-icon class="camaraIcon" ios="ios-camera" md="md-camera"></ion-icon> </button> \n\n                                      <img class="laFoto1" [src]="foto1" [ngClass]="{\'mostrarLaFoto\':mostrarfoto1}" >\n\n                                      <button ion-button color="dark"   (click)="Foto2()" class="Foto" [ngClass]="{\'ocultarBoton\':ocultarBoton2}">  <ion-icon class="camaraIcon" ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n                                      <img class="laFoto2" [src]="foto2" [ngClass]="{\'mostrarLaFoto\':mostrarfoto2}" >\n\n                                      <button ion-button color="dark"  (click)="Foto3()" class="Foto" [ngClass]="{\'ocultarBoton\':ocultarBoton3}">  <ion-icon class="camaraIcon" ios="ios-camera" md="md-camera"></ion-icon> </button>\n\n                                      <img class="laFoto3" [src]="foto3" [ngClass]="{\'mostrarLaFoto\':mostrarfoto3}" >\n\n                                      <button class="aceptar" (click)="Aceptar()" ion-button color="dark">Aceptar</button>\n\n                                </div>\n\n                            </div>\n\n        <h1 class="tituloPag">¿Qu&eacute; piensa de nosotros?</h1>\n\n        <p class="info">Ayudenos a brindarle una mejor atenci&oacute;n cada vez, con la siguiente encuesta:</p>\n\n        <div class="esUnaPregunta">\n\n            <img  *ngIf="respPreg1" src="assets/imgs/beta/not.png" class="errorImg">\n\n        <button ion-button color="light" class="btnContenido" (click)="pregunta1()" outline>Pregunta I</button>\n\n        </div>\n\n        <div class="esUnaPregunta">\n\n                <img *ngIf="respPreg2" src="assets/imgs/beta/not.png" class="errorImg">\n\n         <button ion-button color="light" class="btnContenido" (click)="pregunta2()"  outline>Pregunta II</button>\n\n         </div>\n\n         <div class="esUnaPregunta">\n\n                <img *ngIf="respPreg3"  src="assets/imgs/beta/not.png" class="errorImg">\n\n         <button ion-button color="light"class="btnContenido"  (click)="pregunta3()" outline>Pregunta III</button>\n\n         </div>\n\n         <div class="esUnaPregunta">\n\n                <img  *ngIf="respPreg4"  src="assets/imgs/beta/not.png" class="errorImg">\n\n         <button ion-button color="light"   class="btnContenido" (click)="pregunta4()" outline>Pregunta IV</button>\n\n         </div>\n\n         <div class="esUnaPregunta">\n\n                <img *ngIf="respPreg5" src="assets/imgs/beta/not.png" class="errorImg">\n\n         <button ion-button color="light" class="btnContenido" (click)="pregunta5()" outline>Pregunta V</button>\n\n\n\n        </div>\n\n         <button ion-button color="light"class="btnContenido" (click)="pregunta6()" outline>Fotos (Opcional)</button>\n\n         <button class="enviar" (click)= "SubirEncuesta()" ion-button color="red">Enviar encuesta</button>\n\n      </div>\n\n    \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-cliente\encuesta-cliente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"]])
    ], EncuestaClientePage);
    return EncuestaClientePage;
}());

//# sourceMappingURL=encuesta-cliente.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      About\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-start></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h2>Welcome to Ionic!</h2>\n\n  <p>\n\n    This starter project comes with simple tabs-based layout for apps\n\n    that are going to primarily use a Tabbed UI.\n\n  </p>\n\n  <p>\n\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n\n    update any existing page or create new pages.\n\n  </p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(648);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(789);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_alta_duenio_supervisor_alta_duenio_supervisor__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_perfil_perfil__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_alta_empleado_alta_empleado__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_encuesta_supervisor_encuesta_supervisor__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_listado_supervisor_listado_supervisor__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_reserva_reserva__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_mis_reservas_mis_reservas__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_cuenta_cuenta__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_listado_reservas_listado_reservas__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_juego_uno_juego_uno__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_sala_de_juegos_sala_de_juegos__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_registro_cliente_registro_cliente__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_alta_platos_alta_platos__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_qr_ingreso_local_qr_ingreso_local__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_encuesta_cliente_encuesta_cliente__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_pedir_platos_pedir_platos__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_alta_de_mesa_alta_de_mesa__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_encuesta_de_empleado_encuesta_de_empleado__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_qr_de_la_mesa_qr_de_la_mesa__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_tomar_pedido_tomar_pedido__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_http__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ng2_charts__ = __webpack_require__(791);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_mapa_de_ruta_mapa_de_ruta__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_verificar_tipo_verificar_tipo__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_angularfire2__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_41_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__config__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_firebase__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_juego_juego__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__providers_fcm_fcm__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pipes_el_el__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__components_components_module__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_ionic2_rating__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_juego_dos_juego_dos__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pipes_tiempo_desde_ahora_tiempo_desde_ahora__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__providers_ruteo_ruteo__ = __webpack_require__(801);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_alta_de_mesa_alta_de_mesa__["a" /* AltaDeMesaPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_qr_de_la_mesa_qr_de_la_mesa__["a" /* QrDeLaMesaPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_tomar_pedido_tomar_pedido__["a" /* TomarPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mapa_de_ruta_mapa_de_ruta__["a" /* MapaDeRutaPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_registro_cliente_registro_cliente__["a" /* RegistroClientePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_alta_duenio_supervisor_alta_duenio_supervisor__["a" /* AltaDuenioSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_alta_empleado_alta_empleado__["a" /* AltaEmpleadoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_encuesta_supervisor_encuesta_supervisor__["a" /* EncuestaSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_listado_supervisor_listado_supervisor__["a" /* ListadoSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_reserva_reserva__["a" /* ReservaPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_alta_platos_alta_platos__["a" /* AltaPlatosPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_encuesta_cliente_encuesta_cliente__["a" /* EncuestaClientePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_pedir_platos_pedir_platos__["a" /* PedirPlatosPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_cuenta_cuenta__["a" /* CuentaPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_juego_dos_juego_dos__["a" /* JuegoDosPage */],
                __WEBPACK_IMPORTED_MODULE_51__pipes_tiempo_desde_ahora_tiempo_desde_ahora__["a" /* TiempoDesdeAhoraPipe */],
                __WEBPACK_IMPORTED_MODULE_19__pages_listado_reservas_listado_reservas__["a" /* ListadoReservasPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_juego_juego__["a" /* JuegoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_mis_reservas_mis_reservas__["a" /* MisReservasPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_juego_uno_juego_uno__["a" /* JuegoUnoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_sala_de_juegos_sala_de_juegos__["a" /* SalaDeJuegosPage */],
                __WEBPACK_IMPORTED_MODULE_47__pipes_el_el__["a" /* ElPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/alta-duenio-supervisor/alta-duenio-supervisor.module#AltaDuenioSupervisorPageModule', name: 'AltaDuenioSupervisorPage', segment: 'alta-duenio-supervisor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/encuesta-supervisor/encuesta-supervisor.module#EncuestaSupervisorPageModule', name: 'EncuestaSupervisorPage', segment: 'encuesta-supervisor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/juego-dos/juego-dos.module#JuegoQuinterosPageModule', name: 'JuegoDosPage', segment: 'juego-dos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/listado-reservas/listado-reservas.module#ListadoReservasPageModule', name: 'ListadoReservasPage', segment: 'listado-reservas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-reservas/mis-reservas.module#MisReservasPageModule', name: 'MisReservasPage', segment: 'mis-reservas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reserva/reserva.module#ReservaPageModule', name: 'ReservaPage', segment: 'reserva', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sala-de-juegos/sala-de-juegos.module#SalaDeJuegosPageModule', name: 'SalaDeJuegosPage', segment: 'sala-de-juegos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/alta-de-mesa/alta-de-mesa.module#AltaDeMesaPageModule', name: 'AltaDeMesaPage', segment: 'alta-de-mesa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/alta-empleado/alta-empleado.module#AltaEmpleadoPageModule', name: 'AltaEmpleadoPage', segment: 'alta-empleado', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cuenta/cuenta.module#CuentaPageModule', name: 'CuentaPage', segment: 'cuenta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/encuesta-de-empleado/encuesta-de-empleado.module#EncuestaDeEmpleadoPageModule', name: 'EncuestaDeEmpleadoPage', segment: 'encuesta-de-empleado', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/juego-uno/juego-uno.module#JuegoUnoPageModule', name: 'JuegoUnoPage', segment: 'juego-uno', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/juego/juego.module#JuegoPageModule', name: 'JuegoPage', segment: 'juego', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/listado-supervisor/listado-supervisor.module#ListadoSupervisorPageModule', name: 'ListadoSupervisorPage', segment: 'listado-supervisor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa-de-ruta/mapa-de-ruta.module#MapaDeRutaPageModule', name: 'MapaDeRutaPage', segment: 'mapa-de-ruta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/principal/principal.module#PrincipalPageModule', name: 'PrincipalPage', segment: 'principal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/qr-de-la-mesa/qr-de-la-mesa.module#QrDeLaMesaPageModule', name: 'QrDeLaMesaPage', segment: 'qr-de-la-mesa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tomar-pedido/tomar-pedido.module#TomarPedidoPageModule', name: 'TomarPedidoPage', segment: 'tomar-pedido', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_40_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_42__config__["a" /* firebaseConfig */].fire),
                __WEBPACK_IMPORTED_MODULE_35_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_48__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_34__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_49_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["AngularFirestoreModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_principal_principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_alta_de_mesa_alta_de_mesa__["a" /* AltaDeMesaPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_registro_cliente_registro_cliente__["a" /* RegistroClientePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_alta_duenio_supervisor_alta_duenio_supervisor__["a" /* AltaDuenioSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_alta_empleado_alta_empleado__["a" /* AltaEmpleadoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_encuesta_supervisor_encuesta_supervisor__["a" /* EncuestaSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_listado_supervisor_listado_supervisor__["a" /* ListadoSupervisorPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_reserva_reserva__["a" /* ReservaPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_alta_platos_alta_platos__["a" /* AltaPlatosPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_qr_ingreso_local_qr_ingreso_local__["a" /* QrIngresoLocalPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_encuesta_cliente_encuesta_cliente__["a" /* EncuestaClientePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_pedir_platos_pedir_platos__["a" /* PedirPlatosPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_qr_de_la_mesa_qr_de_la_mesa__["a" /* QrDeLaMesaPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_tomar_pedido_tomar_pedido__["a" /* TomarPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mapa_de_ruta_mapa_de_ruta__["a" /* MapaDeRutaPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_cuenta_cuenta__["a" /* CuentaPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_juego_dos_juego_dos__["a" /* JuegoDosPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_listado_reservas_listado_reservas__["a" /* ListadoReservasPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_juego_juego__["a" /* JuegoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_mis_reservas_mis_reservas__["a" /* MisReservasPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_juego_uno_juego_uno__["a" /* JuegoUnoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_sala_de_juegos_sala_de_juegos__["a" /* SalaDeJuegosPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_39__providers_verificar_tipo_verificar_tipo__["a" /* VerificarTipoProvider */],
                __WEBPACK_IMPORTED_MODULE_41_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_firebase__["a" /* Firebase */],
                __WEBPACK_IMPORTED_MODULE_46__providers_fcm_fcm__["a" /* FcmProvider */],
                __WEBPACK_IMPORTED_MODULE_52__providers_ruteo_ruteo__["a" /* RuteoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrincipalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_verificar_tipo_verificar_tipo__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_fcm_fcm__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__encuesta_de_empleado_encuesta_de_empleado__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var PrincipalPage = /** @class */ (function () {
    function PrincipalPage(navCtrl, navParams, verificarTipo, fcm, toastCtrl, nativeAudio) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.verificarTipo = verificarTipo;
        this.toastCtrl = toastCtrl;
        this.nativeAudio = nativeAudio;
        this.acciones = [];
        this.accionesRespaldoCliente = [];
        this.firebase = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a;
        this.estadoBoton = false;
        this.ocultarAlert = true;
        this.nativeAudio.preloadSimple('a', 'assets/imgs/gamma/fortnite.mp3').catch(function () { });
        fcm.getToken();
        // Listen to incoming messages
        fcm.listenToNotifications().pipe(Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators__["tap"])(function (msg) {
            // show a toast
            var toast = toastCtrl.create({
                message: msg.body,
                duration: 8000,
                position: 'top',
                cssClass: 'nombreRaro'
            });
            if (localStorage.getItem("sonidos") != "false") {
                _this.nativeAudio.play('a').catch(function () { });
            }
            toast.present();
        }))
            .subscribe();
        this.acciones = this.verificarTipo.RetornarAcciones();
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.sonidos = localStorage.getItem("sonidos");
        if (this.usuario.tipo == "cliente" || this.usuario.tipo == "anonimo") {
            this.accionesRespaldoCliente = this.acciones;
            var usuarioRef_1 = this.firebase.database().ref("usuarios");
            var pedidoRef_1;
            usuarioRef_1.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    if (data[item].correo == _this.usuario.correo) {
                        _this.usuarioKey = item;
                        break;
                    }
                }
            }).then(function () {
                setInterval(function () {
                    _this.acciones = _this.acciones;
                }, 500);
                usuarioRef_1.child(_this.usuarioKey).child("estado").on("value", function (snap) {
                    var data = snap.val();
                    var estadoCliente = data;
                    var flag = true;
                    _this.acciones = [];
                    switch (estadoCliente) {
                        case 'delivery':
                            _this.acciones[0] = _this.accionesRespaldoCliente[7];
                            break;
                        /*
                         *
                         * Puede hacer un pedido
                         * Jugar
                         *
                         */
                        case 'atendido':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            break;
                        /*
                         *
                         * Ve el estado del pedido
                         * hacer un pedido
                         * Jugar
                         *
                         */
                        case 'pidio':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[2] : _this.accionesRespaldoCliente[1];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[2] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            if (flag) {
                                flag = false;
                                var estaComiendo_1;
                                usuarioRef_1.child(_this.usuarioKey).once("value", function (snap) {
                                    var data = snap.val();
                                    pedidoRef_1 = _this.firebase.database().ref("pedidos").child(data.mesa);
                                }).then(function () {
                                    pedidoRef_1.on("value", function (snap) {
                                        if (estadoCliente != "pago") {
                                            var data_1 = snap.val();
                                            estaComiendo_1 = true;
                                            for (var item in data_1) {
                                                if (data_1[item].estado && data_1[item].estado != "terminado") {
                                                    estaComiendo_1 = false;
                                                    break;
                                                }
                                            }
                                            if (estaComiendo_1) {
                                                usuarioRef_1.child(_this.usuarioKey).update({
                                                    estado: "comiendo"
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                            break;
                        /*
                         *
                         * Pagar
                         * Ve el estado del pedido
                         * hacer un pedido
                         * Jugar
                         *
                         */
                        case 'comiendo':
                            _this.acciones[0] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[0] : _this.accionesRespaldoCliente[0];
                            _this.acciones[1] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[2] : _this.accionesRespaldoCliente[1];
                            _this.acciones[2] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[3] : _this.accionesRespaldoCliente[2];
                            _this.acciones[3] = (_this.usuario.tipo == "cliente") ? _this.accionesRespaldoCliente[6] : _this.accionesRespaldoCliente[4];
                            break;
                        /*
                         *
                         * El cliente no esta en espera, atendido, comiendo, esperando la comida, puede ser undefined o pago
                         * ingresar al local
                         * reservar
                         *
                         */
                        default:
                            _this.acciones[0] = _this.accionesRespaldoCliente[1];
                            _this.acciones[1] = _this.accionesRespaldoCliente[3];
                            _this.acciones[2] = _this.accionesRespaldoCliente[5];
                            break;
                    }
                });
            }).catch(function () { return console.log("Algo salio mal..."); });
        }
    }
    PrincipalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PrincipalPage');
    };
    PrincipalPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem("refrescarImagen") == "true") {
            localStorage.setItem("refrescarImagen", "false");
            this.usuario = JSON.parse(localStorage.getItem("usuario"));
        }
    };
    PrincipalPage.prototype.Redireccionar = function (ruta) {
        this.navCtrl.push(ruta);
    };
    PrincipalPage.prototype.IrAPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__perfil_perfil__["a" /* PerfilPage */]);
    };
    PrincipalPage.prototype.AlternarSonidos = function () {
        if (localStorage.getItem("sonidos") == "false") {
            localStorage.setItem("sonidos", "true");
            this.sonidos = "true";
        }
        else {
            localStorage.setItem("sonidos", "false");
            this.sonidos = "false";
        }
    };
    PrincipalPage.prototype.MostrarAlert = function (titulo, mensaje, mensajeBoton, handler) {
        this.ocultarAlert = false;
        this.alertTitulo = titulo;
        this.alertMensaje = mensaje;
        this.alertMensajeBoton = mensajeBoton;
        this.alertHandler = handler;
    };
    PrincipalPage.prototype.OcultarAlert = function () {
        this.ocultarAlert = true;
    };
    PrincipalPage.prototype.Logout = function () {
        var _this = this;
        console.log("LogOut");
        console.log("usuario 1 = " + this.usuario.correo);
        var usuariosRef = this.firebase.database().ref("usuarios");
        usuariosRef.once("value", function (snap) {
            var data = snap.val();
            for (var item in data) {
                console.log(data[item].correo);
                if (data[item].correo == _this.usuario.correo) {
                    console.log("usuario = " + _this.usuario.correo);
                    usuariosRef.child(item).update({
                        logueado: false
                    }).then(function () {
                        switch (_this.usuario.tipo) {
                            case 'mozo':
                            case 'cocinero':
                            case 'bartender':
                            case 'metre':
                            case 'repartidor':
                                // Para redireccionar a la encuesta de axel.
                                localStorage.setItem("desloguear", "true");
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__encuesta_de_empleado_encuesta_de_empleado__["a" /* EncuestaDeEmpleadoPage */]);
                                // localStorage.clear();
                                // this.navCtrl.setRoot(LoginPage);
                                break;
                            case 'anonimo':
                                //this.MostrarAlert("fds", "fds", "fds", this.LimpiarAnonimo);
                                break;
                            default:
                                localStorage.clear();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                                break;
                        }
                        // if (this.usuario.tipo == "mozo"
                        //   || this.usuario.tipo == "cocinero"
                        //   || this.usuario.tipo == "bartender"
                        //   || this.usuario.tipo == "metre"
                        //   || this.usuario.tipo == "repartidor") {
                        //   // Para redireccionar a la encuesta de axel.
                        //   // localStorage.setItem("desloguear", "true");
                        //   // this.navCtrl.setRoot(EncuestaDeEmpleadoPage);
                        //   localStorage.clear();
                        //   this.navCtrl.setRoot(LoginPage);
                        // } else {
                        //   localStorage.clear();
                        //   this.navCtrl.setRoot(LoginPage);
                        // }
                    });
                    break;
                }
            }
        });
    };
    PrincipalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-principal',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\principal\principal.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="beer"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>{{usuario.tipo}}</ion-title>\n\n\n\n    <ion-buttons end *ngIf="usuario.tipo != \'anonimo\'">\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<div [ngClass]="{\'alert\':true,\'ocultar\':ocultarAlert}">\n\n\n\n  <div class="alert-message animation-target">\n\n    <h1>{{alertTitulo}}</h1>\n\n    <p>{{alertMensaje}}</p>\n\n    <div class="botones">\n\n\n\n      <button ion-button outline (click)="alertHandler()">{{alertMensajeBoton}}</button>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar color="dark">\n\n      <ion-title>Menú</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <ion-list>\n\n\n\n      <div>\n\n        <img src={{usuario.img}} class="img-menu" />\n\n        <div class="nombre-menu">{{usuario.apellido}}, {{usuario.nombre}} ({{usuario.tipo}})</div>\n\n      </div>\n\n\n\n      <hr class="hr-menu" />\n\n\n\n      <button ion-item *ngFor="let item of acciones" (click)="Redireccionar(item.ruta)">{{item.accion}}</button>\n\n      <button ion-item (click)="IrAPerfil()">Ver mi perfil</button>\n\n      <button ion-item (click)="AlternarSonidos()">\n\n        <ng-container *ngIf="sonidos != \'false\'; else activar">Desactivar sonidos</ng-container>\n\n        <ng-template #activar>Activar sonidos</ng-template>\n\n      </button>\n\n      <button ion-item (click)="Logout()" *ngIf="usuario.tipo != \'anonimo\'">Cerrar sesión</button>\n\n\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav #content swipeBackEnabled="false"></ion-nav>\n\n\n\n<ion-content class="card-background-page" padding>\n\n\n\n  <button ion-button *ngFor="let item of acciones" (click)="Redireccionar(item.ruta)">\n\n    <div class="sombreado"></div>\n\n    <img src="../../assets/imgs/alfa/{{item.img}}" />\n\n    <span>{{item.accion}}</span>\n\n  </button>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\principal\principal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_verificar_tipo_verificar_tipo__["a" /* VerificarTipoProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], PrincipalPage);
    return PrincipalPage;
}());

//# sourceMappingURL=principal.js.map

/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 338,
	"./af.js": 338,
	"./ar": 339,
	"./ar-dz": 340,
	"./ar-dz.js": 340,
	"./ar-kw": 341,
	"./ar-kw.js": 341,
	"./ar-ly": 342,
	"./ar-ly.js": 342,
	"./ar-ma": 343,
	"./ar-ma.js": 343,
	"./ar-sa": 344,
	"./ar-sa.js": 344,
	"./ar-tn": 345,
	"./ar-tn.js": 345,
	"./ar.js": 339,
	"./az": 346,
	"./az.js": 346,
	"./be": 347,
	"./be.js": 347,
	"./bg": 348,
	"./bg.js": 348,
	"./bm": 349,
	"./bm.js": 349,
	"./bn": 350,
	"./bn.js": 350,
	"./bo": 351,
	"./bo.js": 351,
	"./br": 352,
	"./br.js": 352,
	"./bs": 353,
	"./bs.js": 353,
	"./ca": 354,
	"./ca.js": 354,
	"./cs": 355,
	"./cs.js": 355,
	"./cv": 356,
	"./cv.js": 356,
	"./cy": 357,
	"./cy.js": 357,
	"./da": 358,
	"./da.js": 358,
	"./de": 359,
	"./de-at": 360,
	"./de-at.js": 360,
	"./de-ch": 361,
	"./de-ch.js": 361,
	"./de.js": 359,
	"./dv": 362,
	"./dv.js": 362,
	"./el": 363,
	"./el.js": 363,
	"./en-SG": 364,
	"./en-SG.js": 364,
	"./en-au": 365,
	"./en-au.js": 365,
	"./en-ca": 366,
	"./en-ca.js": 366,
	"./en-gb": 367,
	"./en-gb.js": 367,
	"./en-ie": 368,
	"./en-ie.js": 368,
	"./en-il": 369,
	"./en-il.js": 369,
	"./en-nz": 370,
	"./en-nz.js": 370,
	"./eo": 371,
	"./eo.js": 371,
	"./es": 372,
	"./es-do": 373,
	"./es-do.js": 373,
	"./es-us": 374,
	"./es-us.js": 374,
	"./es.js": 372,
	"./et": 375,
	"./et.js": 375,
	"./eu": 376,
	"./eu.js": 376,
	"./fa": 377,
	"./fa.js": 377,
	"./fi": 378,
	"./fi.js": 378,
	"./fo": 379,
	"./fo.js": 379,
	"./fr": 380,
	"./fr-ca": 381,
	"./fr-ca.js": 381,
	"./fr-ch": 382,
	"./fr-ch.js": 382,
	"./fr.js": 380,
	"./fy": 383,
	"./fy.js": 383,
	"./ga": 384,
	"./ga.js": 384,
	"./gd": 385,
	"./gd.js": 385,
	"./gl": 386,
	"./gl.js": 386,
	"./gom-latn": 387,
	"./gom-latn.js": 387,
	"./gu": 388,
	"./gu.js": 388,
	"./he": 389,
	"./he.js": 389,
	"./hi": 390,
	"./hi.js": 390,
	"./hr": 391,
	"./hr.js": 391,
	"./hu": 392,
	"./hu.js": 392,
	"./hy-am": 393,
	"./hy-am.js": 393,
	"./id": 394,
	"./id.js": 394,
	"./is": 395,
	"./is.js": 395,
	"./it": 396,
	"./it-ch": 397,
	"./it-ch.js": 397,
	"./it.js": 396,
	"./ja": 398,
	"./ja.js": 398,
	"./jv": 399,
	"./jv.js": 399,
	"./ka": 400,
	"./ka.js": 400,
	"./kk": 401,
	"./kk.js": 401,
	"./km": 402,
	"./km.js": 402,
	"./kn": 403,
	"./kn.js": 403,
	"./ko": 404,
	"./ko.js": 404,
	"./ku": 405,
	"./ku.js": 405,
	"./ky": 406,
	"./ky.js": 406,
	"./lb": 407,
	"./lb.js": 407,
	"./lo": 408,
	"./lo.js": 408,
	"./lt": 409,
	"./lt.js": 409,
	"./lv": 410,
	"./lv.js": 410,
	"./me": 411,
	"./me.js": 411,
	"./mi": 412,
	"./mi.js": 412,
	"./mk": 413,
	"./mk.js": 413,
	"./ml": 414,
	"./ml.js": 414,
	"./mn": 415,
	"./mn.js": 415,
	"./mr": 416,
	"./mr.js": 416,
	"./ms": 417,
	"./ms-my": 418,
	"./ms-my.js": 418,
	"./ms.js": 417,
	"./mt": 419,
	"./mt.js": 419,
	"./my": 420,
	"./my.js": 420,
	"./nb": 421,
	"./nb.js": 421,
	"./ne": 422,
	"./ne.js": 422,
	"./nl": 423,
	"./nl-be": 424,
	"./nl-be.js": 424,
	"./nl.js": 423,
	"./nn": 425,
	"./nn.js": 425,
	"./pa-in": 426,
	"./pa-in.js": 426,
	"./pl": 427,
	"./pl.js": 427,
	"./pt": 428,
	"./pt-br": 429,
	"./pt-br.js": 429,
	"./pt.js": 428,
	"./ro": 430,
	"./ro.js": 430,
	"./ru": 431,
	"./ru.js": 431,
	"./sd": 432,
	"./sd.js": 432,
	"./se": 433,
	"./se.js": 433,
	"./si": 434,
	"./si.js": 434,
	"./sk": 435,
	"./sk.js": 435,
	"./sl": 436,
	"./sl.js": 436,
	"./sq": 437,
	"./sq.js": 437,
	"./sr": 438,
	"./sr-cyrl": 439,
	"./sr-cyrl.js": 439,
	"./sr.js": 438,
	"./ss": 440,
	"./ss.js": 440,
	"./sv": 441,
	"./sv.js": 441,
	"./sw": 442,
	"./sw.js": 442,
	"./ta": 443,
	"./ta.js": 443,
	"./te": 444,
	"./te.js": 444,
	"./tet": 445,
	"./tet.js": 445,
	"./tg": 446,
	"./tg.js": 446,
	"./th": 447,
	"./th.js": 447,
	"./tl-ph": 448,
	"./tl-ph.js": 448,
	"./tlh": 449,
	"./tlh.js": 449,
	"./tr": 450,
	"./tr.js": 450,
	"./tzl": 451,
	"./tzl.js": 451,
	"./tzm": 452,
	"./tzm-latn": 453,
	"./tzm-latn.js": 453,
	"./tzm.js": 452,
	"./ug-cn": 454,
	"./ug-cn.js": 454,
	"./uk": 455,
	"./uk.js": 455,
	"./ur": 456,
	"./ur.js": 456,
	"./uz": 457,
	"./uz-latn": 458,
	"./uz-latn.js": 458,
	"./uz.js": 457,
	"./vi": 459,
	"./vi.js": 459,
	"./x-pseudo": 460,
	"./x-pseudo.js": 460,
	"./yo": 461,
	"./yo.js": 461,
	"./zh-cn": 462,
	"./zh-cn.js": 462,
	"./zh-hk": 463,
	"./zh-hk.js": 463,
	"./zh-tw": 464,
	"./zh-tw.js": 464
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 766;

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncuestaDeEmpleadoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__principal_principal__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









//LINEA 336    361 Y 364 LAJSDKLASDLKASJDLKAJDKLJDLK
/**
 * Generated class for the EncuestaDeEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EncuestaDeEmpleadoPage = /** @class */ (function () {
    function EncuestaDeEmpleadoPage(navCtrl, navParams, authInstance, toastCtrl, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authInstance = authInstance;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.encuestita = true;
        this.probabilidad = false;
        this.firebase = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a;
        this.db = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.firestore();
        this.foto = "";
        //public cinco;
        this.cinco = { item1: false, item2: false };
        this.pregUnoPrimeraRespuesta = 0;
        this.pregUnoSegundaRespuesta = 0;
        this.pregUnoTerceraRespuesta = 0;
        this.pregTresPrimeraRespuesta = 0;
        this.pregTresSegundaRespuesta = 0;
        this.pregCuatroPrimeraRespuesta = 0;
        this.pregCuatroSegundaRespuesta = 0;
        this.pregCincoPrimeraRespuesta = 0;
        this.pregCincoSegundaRespuesta = 0;
        this.pieChartType = 'pie';
        //this.encuesta();
        //this.usuario = JSON.parse(localStorage.getItem("desloguear"));
        this.desloguaer = JSON.parse(localStorage.getItem("desloguear"));
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        // this.encuesta();
        __WEBPACK_IMPORTED_MODULE_6_chart_js__["defaults"].global.legend.display = false;
        this.uno = 3;
        this.dos = "Me Encanta";
        this.tres = "si";
        this.cuatro = "si";
        this.cinco.item1 = true;
        //this.foto="asdads";
        //this.foto="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg"
        //let date = new Date();
        //this.nombreFoto=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
        //this.foto="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg";
        this.foto = "http://www.oktoberfestole.com/wp-content/uploads/2017/07/mesa-vikinga-OktoberfestOle-1024x675.jpg";
    }
    EncuestaDeEmpleadoPage.prototype.pruebita = function () {
        //alert("asd");
        this.cinco.item2 = false;
        this.cinco.item1 = true;
    };
    EncuestaDeEmpleadoPage.prototype.pruebitaDos = function () {
        this.cinco.item1 = false;
        this.cinco.item2 = true;
    };
    EncuestaDeEmpleadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EncuestaDeEmpleadoPage');
    };
    EncuestaDeEmpleadoPage.prototype.Volver = function () {
        //this.navCtrl.setRoot(SuperControlPanelPage);
    };
    EncuestaDeEmpleadoPage.prototype.randomizeType = function () {
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    };
    EncuestaDeEmpleadoPage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    EncuestaDeEmpleadoPage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    EncuestaDeEmpleadoPage.prototype.enviarEncuesta = function () {
        //this.encuestita=false;
        // this.probabilidad=true;
        var _this = this;
        if (!this.uno || !this.dos || !this.tres || !this.cuatro || !this.cinco) {
            this.presentToast("Todos los campos deben ser completados.");
            return;
        }
        //if(this.foto=="http://estaticos.expansion.com/assets/multimedia/imagenes/2017/09/08/15048915173238.jpg")
        if (this.foto == "http://www.oktoberfestole.com/wp-content/uploads/2017/07/mesa-vikinga-OktoberfestOle-1024x675.jpg") {
            // this.presentToast("Tiene que cargar una foto");
            // return;
            var url = "";
            url = "../../assets/imgs/gamma/llama.jpeg";
            var mesasRef = this.firebase.database().ref("encuestaDeEmpleado");
            mesasRef.push({
                uno: this.uno,
                dos: this.dos,
                tres: this.tres,
                cuatro: this.cuatro,
                cinco: this.cinco,
                img: url
            }).then(function () {
                _this.presentToast("La encuesta fue cargada con éxito.");
                _this.encuesta();
            });
        }
        else {
            var mesasRef_1 = this.firebase.database().ref("encuestaDeEmpleado");
            var pictures_1 = this.firebase.storage().ref("encuestaDeEmpleado/" + this.nombreFoto);
            pictures_1.putString(this.foto, "data_url").then(function () {
                pictures_1.getDownloadURL().then(function (url) {
                    mesasRef_1.push({
                        uno: _this.uno,
                        dos: _this.dos,
                        tres: _this.tres,
                        cuatro: _this.cuatro,
                        cinco: _this.cinco,
                        img: url
                    });
                });
            }).then(function () {
                _this.presentToast("La encuesta fue cargada con éxito.");
                _this.encuesta();
            });
        }
        /*let mesasRef = this.firebase.database().ref("encuestaDeEmpleado");
    
        let pictures = this.firebase.storage().ref(`encuestaDeEmpleado/${this.nombreFoto}`);
    
        pictures.putString(this.foto, "data_url").then(() => {
    
          pictures.getDownloadURL().then((url) => {
    
            mesasRef.push({
              uno: this.uno,
              dos: this.dos,
              tres: this.tres,
              cuatro:this.cuatro,
              cinco:this.cinco,
              img: url
            });
          });
        }).then(() => {
    
          this.presentToast("la encuesta fue cargada con exito");
          this.encuesta();
    
    
    
    
        });*/
        //this.navCtrl
    };
    EncuestaDeEmpleadoPage.prototype.SacarFoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, nombreFoto, options, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        nombreFoto = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + "-" + date.getMilliseconds();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = {
                            quality: 50,
                            targetHeight: 600,
                            targetWidth: 600,
                            allowEdit: true,
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        result = _a.sent();
                        this.foto = "data:image/jpeg;base64," + result;
                        this.nombreFoto = nombreFoto;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EncuestaDeEmpleadoPage.prototype.presentToast = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            cssClass: "infoToast"
        });
        toast.present();
    };
    EncuestaDeEmpleadoPage.prototype.encuesta = function () {
        var _this = this;
        var probRef = this.firebase.database().ref("encuestaDeEmpleado");
        probRef.once("value", function (snap) {
            var data = snap.val();
            //this.esValido = true;
            for (var item in data) {
                if (data[item].uno == 1) {
                    _this.pregUnoPrimeraRespuesta++;
                }
                if (data[item].uno == 2) {
                    _this.pregUnoSegundaRespuesta++;
                }
                if (data[item].uno == 3) {
                    _this.pregUnoTerceraRespuesta++;
                }
                if (data[item].tres == "si") {
                    _this.pregTresPrimeraRespuesta++;
                    // alert("entre");
                }
                if (data[item].tres == "no") {
                    _this.pregTresSegundaRespuesta++;
                }
                if (data[item].cuatro == "si") {
                    _this.pregCuatroPrimeraRespuesta++;
                }
                if (data[item].cuatro == "no") {
                    _this.pregCuatroSegundaRespuesta++;
                }
                if (data[item].cinco.item1 == true) {
                    _this.pregCincoPrimeraRespuesta++;
                }
                if (data[item].cinco.item2 == true) {
                    _this.pregCincoSegundaRespuesta++;
                }
            }
        }).then(function () {
            _this.pieChartLabels = ['Sí', 'No'];
            //this.pieChartData = [this.pregTresPrimeraRespuesta, this.pregTresSegundaRespuesta];
            _this.pieChartData = [_this.pregTresPrimeraRespuesta, _this.pregTresSegundaRespuesta];
            _this.pieChartLabelsDos = ['Sí', 'No'];
            _this.pieChartDataDos = [_this.pregCuatroPrimeraRespuesta, _this.pregCuatroSegundaRespuesta];
            _this.pieChartLabelsCinco = ['Sí', 'No'];
            _this.pieChartDataCinco = [_this.pregCincoPrimeraRespuesta, _this.pregCincoSegundaRespuesta];
            _this.pieChartLabelsUno = ["Bien", "Más o menos", "Mal"];
            //CAMBIE ESTO AL REVES
            _this.pieChartDataUno = [_this.pregUnoTerceraRespuesta, _this.pregUnoSegundaRespuesta, _this.pregUnoPrimeraRespuesta];
            _this.encuestita = false;
            _this.probabilidad = true;
        });
    };
    EncuestaDeEmpleadoPage.prototype.Logout = function () {
        var _this = this;
        if (localStorage.getItem("desloguear")) {
            var usuariosRef_1 = this.firebase.database().ref("usuarios");
            usuariosRef_1.once("value", function (snap) {
                var data = snap.val();
                for (var item in data) {
                    if (data[item].correo == _this.usuario.correo) {
                        usuariosRef_1.child(item).update({
                            logueado: false
                        }).then(function () {
                            localStorage.clear();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
                        });
                        break;
                    }
                }
            });
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__principal_principal__["a" /* PrincipalPage */]);
        }
    };
    EncuestaDeEmpleadoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-encuesta-de-empleado',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-de-empleado\encuesta-de-empleado.html"*/'<!--\n\n  Generated template for the EncuestaDeEmpleadoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Encuesta De Empleado</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>-->\n\n\n\n<!--<ion-header>\n\n  <ion-navbar color="red">\n\n    <ion-title>\n\n      Encuesta de empleados\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button (click)="Logout()">\n\n        <ion-icon name="power"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>-->\n\n\n\n\n\n\n\n\n\n<ion-content padding  class="cds" >\n\n  \n\n  \n\n\n\n    \n\n\n\n <!-- <ion-list class="list">-->\n\n\n\n  <div *ngIf="encuestita">\n\n\n\n    \n\n<!-- style="font-size: 150%;"-->\n\n    <ion-list-header style="background-color:#2f2f2f">\n\n        <div class="realizarEncuesta">Realice la encuesta</div>\n\n      </ion-list-header>\n\n\n\n      <ion-grid>\n\n\n\n          <ion-row>\n\n              <ion-col col-12>\n\n                  <ion-label class="lb" >¿Cuán limpio es el lugar?</ion-label>\n\n                </ion-col>\n\n              </ion-row>\n\n\n\n        \n\n          <ion-row>\n\n              <ion-col col-12>\n\n      \n\n      <ion-item>\n\n        \n\n        <ion-range [(ngModel)]="uno" min="1" max="3" pin="true">\n\n            <ion-icon range-left  name="sad"></ion-icon>\n\n            <ion-icon range-right name="happy"></ion-icon>\n\n\n\n        </ion-range>\n\n      </ion-item>\n\n          </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n          <ion-col col-12>\n\n              <ion-label class="lb" >¿Qué opina del lugar?</ion-label>\n\n            </ion-col>\n\n          </ion-row>\n\n\n\n\n\n      <ion-row>\n\n          <ion-col col-12>\n\n\n\n      \n\n      <ion-item >\n\n         \n\n          <ion-input placeholder="Escriba su opinión" [(ngModel)]="dos"> </ion-input>\n\n        </ion-item>\n\n\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n      <!--</ion-list>-->\n\n\n\n      <ion-row>\n\n          <ion-col col-12>\n\n              <ion-label class="lb" >¿Lo tratan bien sus jefes?</ion-label>\n\n            </ion-col>\n\n          </ion-row>\n\n\n\n      <ion-row>\n\n\n\n        <ion-list radio-group style="margin: 0 30px 0 0;width: 70%;font-size: 150%;display:block;\n\n        margin: 0 auto;" [(ngModel)]="tres">\n\n          <ion-col col-6>\n\n\n\n      \n\n     \n\n      <ion-item>\n\n          <ion-label>Sí</ion-label>\n\n          <ion-radio value="si" checked ></ion-radio>\n\n        </ion-item>\n\n\n\n      </ion-col>\n\n\n\n        <ion-col col-6>\n\n      \n\n        <ion-item>\n\n          <ion-label>No</ion-label>\n\n          <ion-radio value="no" ></ion-radio>\n\n        </ion-item>\n\n\n\n      </ion-col>\n\n\n\n    </ion-list>\n\n\n\n      \n\n\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n        <ion-col col-12>\n\n            <ion-label class="lb">¿Le pagan bien?</ion-label>\n\n          </ion-col>\n\n        </ion-row>\n\n          \n\n    <ion-row>\n\n        <ion-col col-12>\n\n\n\n         \n\n          <ion-item>\n\n              <ion-label>Elija una opción</ion-label>\n\n              <ion-select [(ngModel)]="cuatro">\n\n                <ion-option value="si">Sí</ion-option>\n\n                <ion-option value="no">No</ion-option>\n\n                \n\n              </ion-select>\n\n            </ion-item>\n\n\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n            <ion-col col-12>\n\n               \n\n          <ion-label class="lb">¿Dejaría de trabajar acá?</ion-label>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n        <ion-row>\n\n\n\n        \n\n\n\n            <ion-col col-6>\n\n\n\n\n\n          <ion-item>\n\n              <ion-label >Sí</ion-label>\n\n            <ion-checkbox [(ngModel)]="cinco.item1" (click)="pruebita()"  value="si" checked>Si</ion-checkbox>\n\n            \n\n          </ion-item>\n\n\n\n        </ion-col>\n\n\n\n          <ion-col col-6>\n\n\n\n          <ion-item>\n\n              <ion-label >No</ion-label>\n\n            <ion-checkbox  [(ngModel)]="cinco.item2" (click)="pruebitaDos()" value="no" >No</ion-checkbox>\n\n\n\n            \n\n          </ion-item>\n\n    \n\n\n\n\n\n        </ion-col>\n\n\n\n      \n\n\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n          <ion-col col-12>\n\n\n\n              <button ion-button outline color="red" style="margin: 0 30px 0 0;width: 70%;font-size: 150%;display:block;\n\n              margin: 0 auto;" (click)="SacarFoto()">Tomar Foto\n\n                  </button>\n\n                \n\n    \n\n              \n\n            \n\n\n\n        </ion-col>\n\n       <!-- <ion-col col-6>\n\n\n\n            <img [src]="foto" alt="">\n\n\n\n           \n\n\n\n        </ion-col>-->\n\n      </ion-row>\n\n    <ion-row>\n\n      <ion-col col-12>\n\n          <img [src]="foto" alt="">\n\n      </ion-col>\n\n\n\n    </ion-row>\n\n\n\n      <ion-row>\n\n          <ion-col col-12 style="\n\n          padding-bottom: 50px;\n\n      ">\n\n    \n\n\n\n          <button  ion-button  color="red" style="margin: 0 30px 0 0;width: 70%;display: block;\n\n          margin: 0 auto;" (click)="enviarEncuesta()" >Enviar la encuesta</button>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n   \n\n     \n\n\n\n\n\n\n\n     \n\n        </ion-grid>\n\n\n\n      </div>\n\n\n\n\n\n        <div class="contenidoCharts" *ngIf="probabilidad">\n\n\n\n\n\n            <!--<h2>Resultado de encuestas</h2>-->\n\n\n\n            <!--<h2 class="resultadoEncuesta">Resultado de encuestas</h2>-->\n\n\n\n            <!--ion-list-header style="background-color:#CF4946"-->\n\n                <h1 class="realizarEncuesta">Resultados de las encuestas</h1>\n\n              <!--/ion-list-header-->\n\n\n\n              <div class="pregunta1">\n\n            <h2 class="asd">Pregunta 1, ¿Cuán limpio es el lugar?</h2>\n\n          \n\n            <!--<div class="col-xs-2 col-sm-2 col-md-2">-->\n\n              <div class="canvas">\n\n                <canvas baseChart class="altoCanvas"\n\n                            [data]="pieChartDataUno"\n\n                            [labels]="pieChartLabelsUno"\n\n                            [chartType]="pieChartType"\n\n                            (chartHover)="chartHovered($event)"\n\n                            (chartClick)="chartClicked($event)"></canvas>\n\n              </div>\n\n            </div>\n\n            <div class="pregunta3">\n\n            <h2 class="asd">Pregunta 3, ¿Le tratan bien sus jefes?</h2>\n\n            \n\n            <div class="canvas">\n\n              <canvas baseChart class="altoCanvas"\n\n                          [data]="pieChartData"\n\n                          [labels]="pieChartLabels"\n\n                          [chartType]="pieChartType"\n\n                          (chartHover)="chartHovered($event)"\n\n                          (chartClick)="chartClicked($event)"></canvas>\n\n            </div>\n\n          </div>\n\n          <div class="pregunta4">\n\n            <h2 class="asd">Pregunta 4, ¿Le pagan bien?</h2>\n\n          \n\n            <div class="canvas">\n\n                <canvas baseChart class="altoCanvas"\n\n                            [data]="pieChartDataDos"\n\n                            [labels]="pieChartLabelsDos"\n\n                            [chartType]="pieChartType"\n\n                            (chartHover)="chartHovered($event)"\n\n                            (chartClick)="chartClicked($event)"></canvas>\n\n              </div>\n\n              </div>\n\n          <div class="pregunta5">\n\n              <h2 class="asd">Pregunta 5, ¿Dejaría de trabajar acá?</h2>\n\n          \n\n              <div class="canvas">\n\n                  <canvas baseChart class="altoCanvas"\n\n                              [data]="pieChartDataCinco"\n\n                              [labels]="pieChartLabelsCinco"\n\n                              [chartType]="pieChartType"\n\n                              (chartHover)="chartHovered($event)"\n\n                              (chartClick)="chartClicked($event)"></canvas>\n\n                </div>\n\n          </div>\n\n                <button  ion-button  color="red" style="margin: 0 30px 0 0;width: 70%;display: block;\n\n                    margin: 0 auto;margin-bottom: 80px;" (click)="Logout()" >Salir</button>\n\n          \n\n  \n\n  \n\n  \n\n        </div>\n\n\n\n\n\n        \n\n\n\n</ion-content>\n\n\n\n\n\n<!--<ion-content padding *ngIf="probabilidad">\n\n   style="display: block; width: 100%;height: 90%;" \n\n\n\n  <h2>Resultado de encuestas</h2>\n\n\n\n  <h2>Pregunta 1,Cuan limpio es el lugar?</h2>\n\n\n\n  <div class="col-xs-2 col-sm-2 col-md-2">\n\n      <canvas baseChart\n\n                  [data]="pieChartDataUno"\n\n                  [labels]="pieChartLabelsUno"\n\n                  [chartType]="pieChartType"\n\n                  (chartHover)="chartHovered($event)"\n\n                  (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n  <h2>Pregunta 3,le tratan bien sus jefes?</h2>\n\n  \n\n  <div class="col-xs-2 col-sm-2 col-md-2">\n\n    <canvas baseChart\n\n                [data]="pieChartData"\n\n                [labels]="pieChartLabels"\n\n                [chartType]="pieChartType"\n\n                (chartHover)="chartHovered($event)"\n\n                (chartClick)="chartClicked($event)"></canvas>\n\n  </div>\n\n\n\n  <h2>Pregunta 4,le pagan bien?</h2>\n\n\n\n  <div class="col-xs-2 col-sm-2 col-md-2">\n\n      <canvas baseChart\n\n                  [data]="pieChartDataDos"\n\n                  [labels]="pieChartLabelsDos"\n\n                  [chartType]="pieChartType"\n\n                  (chartHover)="chartHovered($event)"\n\n                  (chartClick)="chartClicked($event)"></canvas>\n\n    </div>\n\n\n\n    <h2>Pregunta 5,Dejaria de trabajar aca?</h2>\n\n\n\n    <div class="col-xs-2 col-sm-2 col-md-2">\n\n        <canvas baseChart\n\n                    [data]="pieChartDataCinco"\n\n                    [labels]="pieChartLabelsCinco"\n\n                    [chartType]="pieChartType"\n\n                    (chartHover)="chartHovered($event)"\n\n                    (chartClick)="chartClicked($event)"></canvas>\n\n      </div>\n\n\n\n      <button  ion-button  color="red" style="margin: 0 30px 0 0;width: 70%;display: block;\n\n          margin: 0 auto;" (click)="Logout()" >Salir</button>\n\n\n\n \n\n \n\n\n\n</ion-content>-->'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\encuesta-de-empleado\encuesta-de-empleado.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
    ], EncuestaDeEmpleadoPage);
    return EncuestaDeEmpleadoPage;
}());

//# sourceMappingURL=encuesta-de-empleado.js.map

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_fcm_fcm__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_audio__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl, fcm, toastCtrl, nativeAudio) {
        var _this = this;
        this.nativeAudio = nativeAudio;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            if (localStorage.getItem("usuario")) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__["a" /* PrincipalPage */];
            }
            var splash = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* SplashPage */]);
            splash.present();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__providers_fcm_fcm__["a" /* FcmProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(513);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    fire: {
        apiKey: "AIzaSyDpKul2aEmTl7LBvWy3fCAzisXzetZs_l4",
        authDomain: "proyecto-pps.firebaseapp.com",
        databaseURL: "https://proyecto-pps.firebaseio.com",
        projectId: "proyecto-pps",
        storageBucket: "proyecto-pps.appspot.com",
        messagingSenderId: "829486067560",
        appId: "1:829486067560:web:ab3417090232202a"
    }
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the ElPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ElPipe = /** @class */ (function () {
    function ElPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ElPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var retorno = "";
        if (value == "1") {
            retorno = "Horribles";
        }
        if (value == "2") {
            retorno = "Feos";
        }
        if (value == "3") {
            retorno = "Pasable";
        }
        if (value == "4") {
            retorno = "Regular";
        }
        if (value == "5") {
            retorno = "Buenos";
        }
        if (value == "6") {
            retorno = "Ricos";
        }
        if (value == "7") {
            retorno = "Muy ricos";
        }
        return retorno;
    };
    ElPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'elPipe',
        })
    ], ElPipe);
    return ElPipe;
}());

//# sourceMappingURL=el.js.map

/***/ }),

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spinner_spinner__ = __webpack_require__(797);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__spinner_spinner__["a" /* SpinnerComponent */]
            ],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__spinner_spinner__["a" /* SpinnerComponent */]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
        console.log('Hello SpinnerComponent Component');
        this.text = 'Hello World';
    }
    SpinnerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-spinner',template:/*ion-inline-start:"C:\Users\Fede\Desktop\vardump-collab\src\components\spinner\spinner.html"*/'<img src="assets/imgs/spinner.gif" />'/*ion-inline-end:"C:\Users\Fede\Desktop\vardump-collab\src\components\spinner\spinner.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());

//# sourceMappingURL=spinner.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TiempoDesdeAhoraPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the TiempoDesdeAhoraPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var TiempoDesdeAhoraPipe = /** @class */ (function () {
    function TiempoDesdeAhoraPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    TiempoDesdeAhoraPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //return value.toLowerCase();
        var ahora = Date.now();
        var antes = Date.parse(value);
        var milisegundo = ahora - antes;
        var segundos = Math.floor(milisegundo / 1000);
        var minutos = 0;
        var horas = 0;
        var dias = Math.floor(horas / 24);
        var mensaje = "hace: ";
        if (segundos > 60) {
            minutos = Math.floor(segundos / 60);
            segundos = segundos % minutos;
            if (minutos > 60) {
                horas = Math.floor(minutos / 60);
                minutos = minutos % horas;
            }
            if (horas > 24) {
                dias = Math.floor(horas / 24);
                horas = horas % dias;
            }
            if (dias != 0) {
                mensaje = mensaje + dias + " días ";
            }
            else {
                mensaje = "Hoy " + mensaje;
            }
            if (minutos < 10)
                minutos = "0" + minutos;
            if (segundos < 10)
                segundos = "0" + segundos;
            mensaje = mensaje + horas + ":" + minutos + ":" + segundos;
        }
        else {
            mensaje = "Recien ";
        }
        return mensaje;
    };
    TiempoDesdeAhoraPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'tiempoDesdeAhora',
        })
    ], TiempoDesdeAhoraPipe);
    return TiempoDesdeAhoraPipe;
}());

//# sourceMappingURL=tiempo-desde-ahora.js.map

/***/ }),

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuteoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RuteoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RuteoProvider = /** @class */ (function () {
    function RuteoProvider(http) {
        this.http = http;
        console.log('Hello RuteoProvider Provider');
    }
    RuteoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RuteoProvider);
    return RuteoProvider;
}());

//# sourceMappingURL=ruteo.js.map

/***/ })

},[515]);
//# sourceMappingURL=main.js.map