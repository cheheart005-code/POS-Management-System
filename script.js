let grandTotal = 0;

let riceStock = 10;
let beansStock = 20;
let oilStock = 15;

let sales = [];

let cart = [];

let products = [];


function addproduct() {

    let customerName =
        document.getElementById("CustomerName").value;

    let productName =
        document.getElementById("ProductName").value;

    let productCost =
        document.getElementById("ProductCost").value;

    let productQuantity =
        document.getElementById("ProductQuantity").value;

    let productImage =
        document.getElementById("ProductImage").files;


    if (
        customerName === "" ||
        productName === "" ||
        productCost === "" ||
        productQuantity === "" ||
        productImage.length === 0
    ) {

        alert("All fields must be filled");

        return;
    }


    let quantity = Number(productQuantity);
    let cost = Number(productCost);


    if (quantity <= 0 || cost <= 0) {

        alert("Quantity and cost must be greater than 0");

        return;
    }


    if (productName.toLowerCase() === "rice" &&
        quantity > riceStock) {

        alert("Not enough Rice in stock");

        return;
    }


    if (productName.toLowerCase() === "beans" &&
        quantity > beansStock) {

        alert("Not enough Beans in stock");

        return;
    }


    if (productName.toLowerCase() === "oil" &&
        quantity > oilStock) {

        alert("Not enough Oil in stock");

        return;
    }


    let total = cost * quantity;


    let product = {

        name: productName,

        cost: cost,

        quantity: quantity,

        total: total,

        image: URL.createObjectURL(productImage[0]),

    };


    cart.push(product);

    grandTotal = grandTotal + total;


    showCart();


    document.getElementById("total").innerText =
        "Total: ₦" + grandTotal;


    document.getElementById("ProductName").value = "";

    document.getElementById("ProductCost").value = "";

    document.getElementById("ProductQuantity").value = "";

}

function removeproduct(index) {

    let removedProduct = cart[index];

    grandTotal =
        grandTotal - removedProduct.total;

    cart.splice(index, 1);

    showCart();

    document.getElementById("total").innerText =
        "Total: ₦" + grandTotal;

}


function showCart() {

    let receipt =
        document.getElementById("receipt");

    receipt.innerHTML = "";


    for (let i = 0; i < cart.length; i++) {

        receipt.innerHTML += `
    <tr>

        <td>
            <img src="${cart[i].image}" class="receipt-image">
        </td>

        <td>
            ${cart[i].name}
        </td>

        <td>
            ₦${cart[i].total}
        </td>

        <td>
            <button onclick="removeproduct(${i})">
                Remove
            </button>
        </td>

    </tr>
`;
    }

}


function checkout() {

    if (cart.length === 0) {

        alert("There is nothing to checkout");

        return;
    }


    for (let i = 0; i < cart.length; i++) {

        let productName =
            cart[i].name.toLowerCase();

        let quantity =
            cart[i].quantity;


        if (productName === "rice") {

            riceStock =
                riceStock - quantity;

        }


        if (productName === "beans") {

            beansStock =
                beansStock - quantity;

        }


        if (productName === "oil") {

            oilStock =
                oilStock - quantity;

        }

    }


    document.getElementById("riceStock").innerText =
        riceStock;

    document.getElementById("beansStock").innerText =
        beansStock;

    document.getElementById("oilStock").innerText =
        oilStock;


    let customerName =
        document.getElementById("CustomerName").value;


    let sale = {

        customer: customerName,

        total: grandTotal,

        date: new Date().toLocaleString()

    };


    sales.push(sale);


    alert("Sale completed");


    showsales();

    updateDashboard();

    showReport();


    cart = [];

    grandTotal = 0;


    document.getElementById("receipt").innerHTML = "";

    document.getElementById("total").innerText =
        "Total: ₦0";

}


function showsales() {

    let history =
        document.getElementById("salesHistory");


    history.innerHTML = "";


    for (let i = 0; i < sales.length; i++) {

        history.innerHTML += `
            <div class="sale">

                <p>
                    Customer: ${sales[i].customer}
                </p>

                <p>
                    Total: ₦${sales[i].total}
                </p>

                <p>
                    Date: ${sales[i].date}
                </p>

            </div>
        `;

    }

}


function addRice() {

    if (riceStock > 0) {

        riceStock = riceStock - 1;

        document.getElementById("riceStock").innerText =
            riceStock;

        if (riceStock <= 3) {

            alert("Rice stock is low");

        }

    } else {

        alert("Rice is out of stock");

    }

    updateDashboard();

}


function restockRice() {

    riceStock = riceStock + 10;

    document.getElementById("riceStock").innerText =
        riceStock;

    alert("Rice has been restocked");

    updateDashboard();

}


function addBeans() {

    if (beansStock > 0) {

        beansStock = beansStock - 1;

        document.getElementById("beansStock").innerText =
            beansStock;

        if (beansStock <= 3) {

            alert("Beans stock is low");

        }

    } else {

        alert("Beans is out of stock");

    }

    updateDashboard();

}


function restockBeans() {

    beansStock = beansStock + 10;

    document.getElementById("beansStock").innerText =
        beansStock;

    alert("Beans have been restocked");

    updateDashboard();

}


function addOil() {

    if (oilStock > 0) {

        oilStock = oilStock - 1;

        document.getElementById("oilStock").innerText =
            oilStock;

        if (oilStock <= 3) {

            alert("Oil stock is low");

        }

    } else {

        alert("Oil is out of stock");

    }

    updateDashboard();

}


function restockOil() {

    oilStock = oilStock + 10;

    document.getElementById("oilStock").innerText =
        oilStock;

    alert("Oil has been restocked");

    updateDashboard();

}


function updateDashboard() {

    document.getElementById("totalSales").innerText =
        sales.length;


    let money = 0;


    for (let i = 0; i < sales.length; i++) {

        money =
            money + sales[i].total;

    }


    document.getElementById("moneyMade").innerText =
        "₦" + money;


    let totalStock =
        riceStock +
        beansStock +
        oilStock;


    document.getElementById("productsInStock").innerText =
        totalStock;

}


function showReport() {

    let report =
        document.getElementById("salesReport");


    report.innerHTML = "";


    for (let i = 0; i < sales.length; i++) {

        report.innerHTML += `
            <div class="report">

                <p>
                    Sale ${i + 1}
                </p>

                <p>
                    Customer: ${sales[i].customer}
                </p>

                <p>
                    Amount: ₦${sales[i].total}
                </p>

                <p>
                    Date: ${sales[i].date}
                </p>

            </div>
        `;

    }

}

function addNewProduct() {

    let productName = prompt("Enter product name:");
    let productCost = prompt("Enter product cost:");
    let productStock = prompt("Enter product stock:");

    if (
        productName === null ||
        productCost === null ||
        productStock === null
    ) {
        return;
    }

    if (
        productName === "" ||
        productCost === "" ||
        productStock === ""
    ) {
        alert("Please fill all the fields");
        return;
    }

    let product = {
        name: productName,
        cost: Number(productCost),
        stock: Number(productStock)
    };

    products.push(product);

    showNewProducts();

    alert(productName + " has been added");
}

function showNewProducts() {

    let productArea = document.querySelector("#productArea");

    productArea.innerHTML = "";

    for (let i = 0; i < products.length; i++) {

        let product = document.createElement("div");

        product.className = "product";

        product.innerHTML = `
            <h3>${products[i].name}</h3>

            <p>Cost: ₦${products[i].cost}</p>

            <p>
                Stock:
                <span>${products[i].stock}</span>
            </p>

            <button onclick="restockNewProduct(${i})">
                Restock
            </button>
        `;

        productArea.appendChild(product);
    }

}

function restockNewProduct(index) {

    products[index].stock =
        products[index].stock + 10;

    showNewProducts();

    alert(products[index].name + " has been restocked");
}