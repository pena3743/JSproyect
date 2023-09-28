class createUser {
    constructor (usr) {
        this.id = usr.id
        this.user = usr.user;
        this.mail = usr.mail;
        this.pass = usr.pass;
    }    
}    

class createProducts {
    constructor (product) {
        this.id = product.id,
        this.code = product.code,
        this.description = product.description,
        this.price = product.price,
        this.stock = product.stock
    }    
}

const btnLog = document.querySelector('#log-btn');
const btnReg = document.querySelector('#reg-btn');
const btnCre = document.querySelector('#cre-btn');
const btnRcp = document.querySelector('#receipt');
const btnIss = document.querySelector('#iss-btn');
const btnFnd = document.querySelector('#fnd-btn');
const funLis = document.querySelector('.prod-list')
const menuPg = document.querySelector('.menu')
const indexPg = document.querySelector('.index')

if(btnLog) {btnLog.addEventListener('click', logIn)};
if(btnReg) {btnReg.addEventListener('click', register)};
if(btnCre) {btnCre.addEventListener('click', createProduct)};
if(btnRcp) {btnRcp.addEventListener('click', stockReceipt)};
if(btnIss) {btnIss.addEventListener('click', stockIssue)};
if(btnFnd) {btnFnd.addEventListener('click', productStatus)};
if(funLis) {listProducts()};

if (menuPg){
    document.addEventListener('keydown', (e) => {
        if (e.code === "Numpad1" || e.code === "Digit1") {
            location.href = './newProduct.html';
        } else if (e.code === "Numpad2" || e.code === "Digit2") {
            location.href = './stockReceipt.html';
        } else if (e.code === "Numpad3" || e.code === "Digit3") {
            location.href = './stockIssue.html';
        } else if (e.code === "Numpad4" || e.code === "Digit4") {
            location.href = './productList.html';
        } else if (e.code === "Numpad5" || e.code === "Digit5") {
            location.href = './findProduct.html';
        } else if (e.code === "Numpad6" || e.code === "Digit6") {
            location.href = './menu.html';
        }
    });
};
if (indexPg) {
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case "Numpad1":
            case "Digit1":
                location.href = './login.html';
                break;
            case "Numpad2":
            case "Digit2":
                location.href = './register.html';
                break;
            }
        });
    }

/* ------------------------- Crear nuevos productos ------------------------- */
function createProduct (e) {
    e.preventDefault();
    if(e.target.id == 'cre-btn'){
        const prodCode = document.querySelector('#cre-code').value;
        const prodObject = JSON.parse(localStorage.getItem('products'));
        const prodIdx = prodObject.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Codigo de producto ya existente',
            })
        } else {
            const prodDesc = document.querySelector('#cre-desc').value;
            const prodPrice = document.querySelector('#cre-price').value;
            const prodStock = document.querySelector('#cre-stock').value;
            const maxId = prodObject.reduce((prods,item)=> prods = prods > item.id ? prods: item.id,0 )
            const newProduct = {
                id: maxId + 1,
                code: prodCode,
                description: prodDesc,
                price: prodPrice,
                stock: prodStock
            }
            prodObject.push(new createProducts(newProduct));
            localStorage.setItem('products', JSON.stringify(prodObject));
            const item = document.createElement('ul');
            item.innerHTML = `
            <ul class="container fs-4">Producto <strong>${newProduct.code}</strong> creado:
                <li class="fs-5"><strong>Descripcion: ${newProduct.description}</strong></li>
                <li class="fs-5"><strong>Precio: ${newProduct.price}</strong></li>
                <li class="fs-5"><strong>Stock: ${newProduct.stock}</strong></li>
                <li class="fs-5"><strong>ID: ${newProduct.id}</strong></li>
            </ul> 
            `
            document.querySelector('.cre-info').replaceChildren(item);
        }    
    }     
}    

/* ---------------------- listar los productos creados ---------------------- */
function listProducts () {
    const prodObject = JSON.parse(localStorage.getItem('products'));
    prodObject.forEach(product => {
        const item = document.createElement('ul');
        item.innerHTML = `
        <ul class="container fs-4">Código: <strong>${product.code}</strong>
            <li class="fs-5">Descripción: <strong>${product.description}</strong></li>
            <li class="fs-5">Precio: <strong>${product.price}</strong></li>
            <li class="fs-5">Stock: <strong>${product.stock}</strong></li>
            <li class="fs-5">Id: <strong>${product.id}</strong></li>
        </ul>
        `
        funLis.appendChild(item);
    });
}    

/* -------------------------- consultar un producto ------------------------- */
function productStatus(e) {
    e.preventDefault();
    if(e.target.id = 'fnd-btn'){
        const prodCode = document.querySelector('#find-code').value
        const prodObject = JSON.parse(localStorage.getItem('products'));
        const prodIdx = prodObject.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            const item = document.createElement('ul');
            item.innerHTML = `
            <ul class="container fs-4">Codigo: <strong>${prodObject[prodIdx].code}</strong>
                <li class="fs-5">Descripcion: <strong>${prodObject[prodIdx].description}</strong></li>
                <li class="fs-5">Precio: <strong>${prodObject[prodIdx].price}</strong></li>
                <li class="fs-5">Stock: <strong>${prodObject[prodIdx].stock}</strong></li>
                <li class="fs-5">ID: <strong>${prodObject[prodIdx].id}</strong></li>
            </ul> 
            `
            document.querySelector('.prod-info').replaceChildren(item);
        } else {
            const item = document.createElement('p');
            item.innerHTML = '<p class="msg container">Codigo inexistente</p>';
            document.querySelector('.prod-info').replaceChildren(item);
        }
    }     
}    

/* ---------------------------- Ingreso de stock ---------------------------- */
function stockReceipt (e) {
    e.preventDefault();
    if(e.target.id == 'rcp-btn'){
        const prodCode = document.querySelector('#receipt #rcp-code').value
        const prodObject = JSON.parse(localStorage.getItem('products'));
        if (prodCode !== null){
            const prodIdx = prodObject.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) { 
                let qty = Number(document.querySelector('#receipt #rcp-qty').value);
                if(qty > 0) {
                    prodObject[prodIdx].stock = Number(prodObject[prodIdx].stock) + qty;
                    localStorage.setItem('products', JSON.stringify(prodObject));
                    const item = document.createElement('ul');
                    item.innerHTML = `
                    <ul class="container fs-4">Código: <strong>${prodObject[prodIdx].code}</strong>
                        <li class="fs-5">Descripción: <strong>${prodObject[prodIdx].description}</strong></li>
                        <li class="fs-5">Precio: <strong>${prodObject[prodIdx].price}</strong></li>
                        <li class="fs-5">Stock: <strong>${prodObject[prodIdx].stock}</strong></li>
                        <li class="fs-5">Id: <strong>${prodObject[prodIdx].id}</strong></li>
                    </ul>
                    `
                    document.querySelector('.receipt').replaceChildren(item);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La cantidad debe ser mayor que 0',
                      })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Codigo inexistente',
                })
            }    
        }
    }
}

/* ---------------------------- consumo del stock --------------------------- */
function stockIssue(e) {
    e.preventDefault();
    if(e.target.id == 'iss-btn'){
        const prodCode = document.querySelector('#issue #iss-code').value
        const prodObject = JSON.parse(localStorage.getItem('products'));
        const prodIdx = prodObject.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) {
            let qty = Number(document.querySelector('#issue #iss-qty').value);  
            if(qty > 0) {
                if (prodObject[prodIdx].stock >= qty) {
                    prodObject[prodIdx].stock = prodObject[prodIdx].stock - qty;
                    localStorage.setItem('products', JSON.stringify(prodObject));
                    const item = document.createElement('ul');
                    item.innerHTML = `
                    <ul class="container fs-4">Código: <strong>${prodObject[prodIdx].code}</strong>
                        <li class="fs-5">Descripción: <strong>${prodObject[prodIdx].description}</strong></li>
                        <li class="fs-5">Precio: <strong>${prodObject[prodIdx].price}</strong></li>
                        <li class="fs-5">Stock: <strong>${prodObject[prodIdx].stock}</strong></li>
                        <li class="fs-5">Id: <strong>${prodObject[prodIdx].id}</strong></li>
                    </ul>
                    `
                    document.querySelector('.issue').replaceChildren(item);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `<p>No hay stock suficiente</p><p>Stock disponible: ${prodObject[prodIdx].stock}</p>`,
                    })
                }    
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cantidad debe ser mayor a cero',
                })
            }    
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Codigo inexistente',
            })
        }    
    } 
}    

/* --------------------------- ingreso de usuario --------------------------- */
function logIn(e){
    e.preventDefault();
    if(e.target.id == 'log-btn'){
        const enteredUser = document.querySelector('#login #log-user').value;
        const userObject = JSON.parse(localStorage.getItem('users'));
        const userIdx = userObject.findIndex(user => user.user == enteredUser)
        if(userIdx != -1){
            const enteredPass = document.querySelector('#login #log-pass').value;
            if(enteredPass === userObject[userIdx].pass){
                Swal.fire(
                    '¡Bienvenido!',
                    enteredUser,
                    'success'
                    ).then(() => location.href = './menu.html')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                    footer: '<a href="./register.html">Registrarse</a>'
                  })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos',
                footer: '<a href="./register.html">Registrarse</a>'
              })
        }
    }
}

/* --------------------------- registro de usuario -------------------------- */
function register(e){
    e.preventDefault();
    if(e.target.id == 'reg-btn'){
        const enteredUser = document.querySelector('#register #reg-user').value;
        const userObject = JSON.parse(localStorage.getItem('users'));
        const userIdx = userObject.findIndex(user => user.user == enteredUser)
        if(userIdx === -1){
            const enteredPass = document.querySelector('#register #reg-pass').value;
            const enteredMail = document.querySelector('#register #reg-email').value;
            const maxId = userObject.reduce((users,usr)=> users = users > usr.id ? users: usr.id,0 )
            Swal.fire(
                '¡Bienvenido!',
                enteredUser,
                'success'
                ).then(() => location.href = './menu.html')
            const newUser = {
                id: maxId + 1,
                user: enteredUser,
                mail: enteredMail,
                pass: enteredPass
            }
            userObject.push(new createUser(newUser));
            localStorage.setItem('users', JSON.stringify(userObject));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario ya existente',
                footer: '<a href="./logIn.html">Login</a>'
              })
        }
    }
}