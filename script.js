let grandTotal = 0;

let riceStock = 10;
let beansStock = 20;
let oilStock = 15;

let sales = [];

let cart = [];

let products = [];

document.addEventListener("DOMContentLoaded", function () {

    setTodayDate();

    updateProductValue();

    updateCurrentQuantity();

    updatePaymentDetails();

    updateDashboard();

});

function setTodayDate() {

    let dateInput =
        document.getElementById("saleDate");

    if (dateInput) {

        let today = new Date();

        let year = today.getFullYear();

        let month =
            String(today.getMonth() + 1).padStart(2, "0");

        let day =
            String(today.getDate()).padStart(2, "0");

        dateInput.value =
            year + "-" + month + "-" + day;
    }

}

document.addEventListener("change", function (event) {

    if (event.target.id === "saleDate") {

        updateReceiptInformation();

    }

});

function addproduct() {

    let customerName =
        document.getElementById("CustomerName").value.trim();


    let productName =
        document.getElementById("ProductName").value.trim();


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

        alert("Please fill all the required fields.");

        return;
    }

    let quantity =
        Number(productQuantity);

    let cost =
        Number(productCost);


    if (quantity <= 0 || cost <= 0) {

        alert("Quantity and cost must be greater than 0.");

        return;
    }

    if (
        productName.toLowerCase() === "rice" &&
        quantity > riceStock
    ) {

        alert("Not enough Rice in stock.");

        return;
    }


    if (
        productName.toLowerCase() === "beans" &&
        quantity > beansStock
    ) {

        alert("Not enough Beans in stock.");

        return;
    }


    if (
        productName.toLowerCase() === "oil" &&
        quantity > oilStock
    ) {

        alert("Not enough Oil in stock.");

        return;
    }

    for (let i = 0; i < products.length; i++) {

        if (
            products[i].name.toLowerCase() ===
            productName.toLowerCase()
        ) {

            if (quantity > products[i].stock) {

                alert(
                    "Not enough " +
                    products[i].name +
                    " in stock."
                );

                return;
            }

        }

    }

    let total =
        cost * quantity;

    let product = {

        name: productName,

        cost: cost,

        quantity: quantity,

        total: total,

        image:
            URL.createObjectURL(productImage[0])

    };

    cart.push(product);


    grandTotal =
        grandTotal + total;

    showCart();

    updateCurrentQuantity();

    updatePaymentDetails();

    document.getElementById(
        "receiptCustomerName"
    ).innerText = customerName;


    document.getElementById(
        "ProductName"
    ).value = "";


    document.getElementById(
        "ProductCost"
    ).value = "";


    document.getElementById(
        "ProductQuantity"
    ).value = "";


    document.getElementById(
        "ProductImage"
    ).value = "";

    document.getElementById(
        "productValue"
    ).innerText = "₦0";

}

function updateProductValue() {

    let costInput =
        document.getElementById("ProductCost");

    let quantityInput =
        document.getElementById("ProductQuantity");

    let valueBox =
        document.getElementById("productValue");


    if (
        !costInput ||
        !quantityInput ||
        !valueBox
    ) {

        return;
    }


    let cost =
        Number(costInput.value) || 0;


    let quantity =
        Number(quantityInput.value) || 0;


    let value =
        cost * quantity;


    valueBox.innerText =
        "₦" + value.toLocaleString();
}

document.addEventListener("input", function (event) {

    if (
        event.target.id === "ProductCost" ||
        event.target.id === "ProductQuantity"
    ) {

        updateProductValue();

    }


    if (
        event.target.id === "amountReceived"
    ) {

        updatePaymentDetails();

    }

});

function removeproduct(index) {

    let removedProduct =
        cart[index];


    if (!removedProduct) {

        return;
    }


    grandTotal =
        grandTotal - removedProduct.total;


    cart.splice(index, 1);


    showCart();

    updateCurrentQuantity();

    updatePaymentDetails();

    if (cart.length === 0) {

        document.getElementById(
            "receiptCustomerName"
        ).innerText = "No Customer";

    }

}

function showCart() {

    let receipt =
        document.getElementById("receipt");


    receipt.innerHTML = "";


    for (let i = 0; i < cart.length; i++) {

        receipt.innerHTML += `

            <tr>

                <td>

                    <img
                        src="${cart[i].image}"
                        class="receipt-image"
                        alt="${cart[i].name}"
                    >

                </td>


                <td>
                    ${i + 1}
                </td>


                <td>
                    ${cart[i].name}
                </td>


                <td>
                    -
                </td>


                <td>
                    -
                </td>


                <td>
                    ${cart[i].quantity}
                </td>


                <td>
                    ₦${cart[i].cost.toLocaleString()}
                </td>


                <td>
                    ₦${cart[i].total.toLocaleString()}
                </td>


                <td>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        onclick="removeproduct(${i})">

                        Remove

                    </button>

                </td>

            </tr>

        `;

    }

}

function updateCurrentQuantity() {

    let currentQuantity = 0;


    for (let i = 0; i < cart.length; i++) {

        currentQuantity =
            currentQuantity + cart[i].quantity;

    }


    let quantityElement =
        document.getElementById("currentQty");


    if (quantityElement) {

        quantityElement.innerText =
            currentQuantity;

    }

}

function updatePaymentDetails() {

    let amountReceivedInput =
        document.getElementById("amountReceived");


    let amountReceived = 0;


    if (amountReceivedInput) {

        amountReceived =
            Number(amountReceivedInput.value) || 0;

    }

    let receivedDisplay =
        document.getElementById("receivedDisplay");


    if (receivedDisplay) {

        receivedDisplay.innerText =
            "₦" +
            amountReceived.toLocaleString();

    }

    let change =
        amountReceived - grandTotal;


    let changeElement =
        document.getElementById("change");


    if (changeElement) {

        if (change >= 0) {

            changeElement.innerText =
                "₦" +
                change.toLocaleString();

        } else {

            changeElement.innerText =
                "₦0";

        }

    }

    let totalElement =
        document.getElementById("total");


    if (totalElement) {

        totalElement.innerText =
            "Total: ₦" +
            grandTotal.toLocaleString();

    }

}

function newSale() {

    if (cart.length > 0) {

        let confirmNewSale =
            confirm(
                "Clear the current sale and start a new one?"
            );


        if (!confirmNewSale) {

            return;

        }

    }

    cart = [];

    grandTotal = 0;

    cart = [];

    grandTotal = 0;

    let customerName =
        document.getElementById("CustomerName");

    if (customerName) {

        customerName.value = "";

    }


    let customerAddress =
        document.getElementById("CustomerAddress");

    if (customerAddress) {

        customerAddress.value = "";

    }


    let customerPhone =
        document.getElementById("CustomerPhone");

    if (customerPhone) {

        customerPhone.value = "";

    }

    document.getElementById(
        "ProductName"
    ).value = "";


    document.getElementById(
        "ProductCost"
    ).value = "";


    document.getElementById(
        "ProductQuantity"
    ).value = "";


    document.getElementById(
        "ProductImage"
    ).value = "";

    let amountReceived =
        document.getElementById("amountReceived");


    if (amountReceived) {

        amountReceived.value = "";

    }

    document.getElementById(
        "receipt"
    ).innerHTML = "";


    document.getElementById(
        "receiptCustomerName"
    ).innerText = "No Customer";

    document.getElementById(
        "productValue"
    ).innerText = "₦0";


    updateCurrentQuantity();

    updatePaymentDetails();


    alert("New sale started.");

}

function checkout() {

    if (cart.length === 0) {

        alert("There is nothing to checkout.");

        return;
    }

    let customerName =
        document.getElementById(
            "CustomerName"
        ).value.trim();


    if (customerName === "") {

        alert("Please enter the customer name.");

        return;
    }

    let amountReceived =
        Number(
            document.getElementById(
                "amountReceived"
            ).value
        ) || 0;


    if (amountReceived < grandTotal) {

        alert(
            "Amount received is less than the total."
        );

        return;
    }

    for (let i = 0; i < cart.length; i++) {

        let productName =
            cart[i].name.toLowerCase();


        let quantity =
            cart[i].quantity;


        /* Rice */

        if (productName === "rice") {

            riceStock =
                riceStock - quantity;

        }


        /* Beans */

        if (productName === "beans") {

            beansStock =
                beansStock - quantity;

        }


        /* Oil */

        if (productName === "oil") {

            oilStock =
                oilStock - quantity;

        }


        /* Custom products */

        for (let j = 0; j < products.length; j++) {

            if (
                products[j].name.toLowerCase() ===
                productName
            ) {

                products[j].stock =
                    products[j].stock - quantity;

            }

        }

    }

    document.getElementById(
        "riceStock"
    ).innerText = riceStock;


    document.getElementById(
        "beansStock"
    ).innerText = beansStock;


    document.getElementById(
        "oilStock"
    ).innerText = oilStock;

    let paymentMethod =
        document.getElementById(
            "paymentMethod"
        ).value;

    let change =
        amountReceived - grandTotal;


    let sale = {

        customer: customerName,

        total: grandTotal,

        amountReceived: amountReceived,

        change: change,

        paymentMethod: paymentMethod,

        date:
            new Date().toLocaleString()

    };


    sales.push(sale);

    showsales();

    updateDashboard();

    showReport();

    showNewProducts();

    increaseReceiptNumber();

    cart = [];

    grandTotal = 0;


    document.getElementById(
        "receipt"
    ).innerHTML = "";


    document.getElementById(
        "total"
    ).innerText = "Total: ₦0";


    document.getElementById(
        "receiptCustomerName"
    ).innerText = "No Customer";


    document.getElementById(
        "CustomerName"
    ).value = "";


    document.getElementById(
        "CustomerAddress"
    ).value = "";


    document.getElementById(
        "CustomerPhone"
    ).value = "";


    document.getElementById(
        "amountReceived"
    ).value = "";


    updateCurrentQuantity();

    updatePaymentDetails();


    alert(
        "Sale completed successfully."
    );

}

function increaseReceiptNumber() {

    let receiptInput =
        document.getElementById(
            "receiptNumber"
        );


    if (!receiptInput) {

        return;
    }


    let currentValue =
        receiptInput.value;


    let number =
        parseInt(
            currentValue.replace("POS-", "")
        );


    if (isNaN(number)) {

        number = 1;

    }


    number++;


    receiptInput.value =
        "POS-" +
        String(number).padStart(3, "0");

    updateReceiptInformation();

}

function showsales() {

    let history =
        document.getElementById(
            "salesHistory"
        );


    history.innerHTML = "";


    for (let i = 0; i < sales.length; i++) {

        history.innerHTML += `

            <div class="sale">

                <p>
                    Customer:
                    ${sales[i].customer}
                </p>


                <p>
                    Total:
                    ₦${sales[i].total.toLocaleString()}
                </p>


                <p>
                    Payment:
                    ${sales[i].paymentMethod}
                </p>


                <p>
                    Amount Received:
                    ₦${sales[i].amountReceived.toLocaleString()}
                </p>


                <p>
                    Change:
                    ₦${sales[i].change.toLocaleString()}
                </p>


                <p>
                    Date:
                    ${sales[i].date}
                </p>

            </div>

        `;

    }

}

function restockRice() {

    riceStock =
        riceStock + 10;


    document.getElementById(
        "riceStock"
    ).innerText = riceStock;


    alert(
        "Rice has been restocked."
    );


    updateDashboard();

}

function restockBeans() {

    beansStock =
        beansStock + 10;


    document.getElementById(
        "beansStock"
    ).innerText = beansStock;


    alert(
        "Beans have been restocked."
    );


    updateDashboard();

}

function restockOil() {

    oilStock =
        oilStock + 10;


    document.getElementById(
        "oilStock"
    ).innerText = oilStock;


    alert(
        "Oil has been restocked."
    );


    updateDashboard();

}

function updateDashboard() {

    document.getElementById(
        "totalSales"
    ).innerText =
        sales.length;


    let money = 0;


    for (let i = 0; i < sales.length; i++) {

        money =
            money + sales[i].total;

    }


    document.getElementById(
        "moneyMade"
    ).innerText =
        "₦" + money.toLocaleString();


    let totalStock =
        riceStock +
        beansStock +
        oilStock;


    for (let i = 0; i < products.length; i++) {

        totalStock =
            totalStock + products[i].stock;

    }


    document.getElementById(
        "productsInStock"
    ).innerText =
        totalStock;

}

function showReport() {

    let report =
        document.getElementById(
            "salesReport"
        );


    report.innerHTML = "";


    for (let i = 0; i < sales.length; i++) {

        report.innerHTML += `

            <div class="report">

                <p>
                    Sale ${i + 1}
                </p>


                <p>
                    Customer:
                    ${sales[i].customer}
                </p>


                <p>
                    Amount:
                    ₦${sales[i].total.toLocaleString()}
                </p>


                <p>
                    Payment:
                    ${sales[i].paymentMethod}
                </p>


                <p>
                    Date:
                    ${sales[i].date}
                </p>

            </div>

        `;

    }

}

function addNewProduct() {

    let productName =
        prompt("Enter product name:");


    let productCost =
        prompt("Enter product cost:");


    let productStock =
        prompt("Enter product stock:");


    if (
        productName === null ||
        productCost === null ||
        productStock === null
    ) {

        return;
    }


    productName =
        productName.trim();


    productCost =
        productCost.trim();


    productStock =
        productStock.trim();


    if (
        productName === "" ||
        productCost === "" ||
        productStock === ""
    ) {

        alert(
            "Please fill all the fields."
        );

        return;
    }


    let cost =
        Number(productCost);


    let stock =
        Number(productStock);


    if (
        isNaN(cost) ||
        isNaN(stock) ||
        cost <= 0 ||
        stock < 0
    ) {

        alert(
            "Please enter valid numbers."
        );

        return;
    }


    let product = {

        name: productName,

        cost: cost,

        stock: stock

    };


    products.push(product);


    showNewProducts();

    updateDashboard();


    alert(
        productName +
        " has been added."
    );

}

function showNewProducts() {

    let productArea =
        document.querySelector(
            "#newProductsArea"
        );


    productArea.innerHTML = "";


    for (
        let i = 0;
        i < products.length;
        i++
    ) {

        let product =
            document.createElement(
                "div"
            );


        product.className =
            "product";


        product.innerHTML = `

            <h3>
                ${products[i].name}
            </h3>


            <p>
                Cost:
                ₦${products[i].cost.toLocaleString()}
            </p>


            <p>
                Stock:
                <span>
                    ${products[i].stock}
                </span>
            </p>


            <button
                type="button"
                class="btn btn-sm btn-outline-dark"
                onclick="restockNewProduct(${i})">

                Restock

            </button>

        `;


        productArea.appendChild(
            product
        );

    }

}

function restockNewProduct(index) {

    if (!products[index]) {

        return;
    }


    products[index].stock =
        products[index].stock + 10;


    showNewProducts();

    updateDashboard();


    alert(
        products[index].name +
        " has been restocked."
    );

}

function printReceipt() {

    if (cart.length === 0) {

        alert("There is nothing to print.");

        return;
    }

    fillPrintArea();

    window.print();

}

function fillPrintArea() {

    document.getElementById("printReceiptNo").innerText =
        document.getElementById("receiptNumber").value || "-";

    document.getElementById("printDate").innerText =
        document.getElementById("saleDate").value || "-";

    document.getElementById("printCustomerName").innerText =
        document.getElementById("CustomerName").value || "-";

    document.getElementById("printCustomerAddress").innerText =
        document.getElementById("CustomerAddress").value || "-";

    document.getElementById("printCustomerPhone").innerText =
        document.getElementById("CustomerPhone").value || "-";


    let printItems =
        document.getElementById("printItems");

    printItems.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {

        printItems.innerHTML += `

            <tr>
                <td>${cart[i].name}</td>
                <td>${cart[i].quantity}</td>
                <td>₦${cart[i].cost.toLocaleString()}</td>
                <td>₦${cart[i].total.toLocaleString()}</td>
            </tr>

        `;

    }


    document.getElementById("printTax").innerText =
        document.getElementById("taxTotal").innerText.trim();

    document.getElementById("printDiscount").innerText =
        document.getElementById("discount").innerText.trim();

    document.getElementById("printServices").innerText =
        document.getElementById("servicesAdd").innerText.trim();

    document.getElementById("printNetTotal").innerText =
        "₦" + grandTotal.toLocaleString();

    document.getElementById("printPaymentMethod").innerText =
        document.getElementById("paymentMethod").value || "-";

    document.getElementById("printReceived").innerText =
        document.getElementById("receivedDisplay").innerText.trim();

    document.getElementById("printChange").innerText =
        document.getElementById("change").innerText.trim();

}

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        let activeElement =
            document.activeElement;


        if (
            activeElement &&
            (
                activeElement.id === "ProductName" ||
                activeElement.id === "ProductCost" ||
                activeElement.id === "ProductQuantity"
            )
        ) {

            event.preventDefault();

            addproduct();

        }

    }

});

function updateReceiptInformation() {

    let receiptInput =
        document.getElementById("receiptNumber");


    let receiptDisplay =
        document.getElementById("receiptNumberDisplay");


    if (
        receiptInput &&
        receiptDisplay
    ) {

        receiptDisplay.innerText =
            receiptInput.value;

    }


    let dateInput =
        document.getElementById("saleDate");


    let dateDisplay =
        document.getElementById("receiptDateDisplay");


    if (
        dateInput &&
        dateDisplay
    ) {

        if (dateInput.value !== "") {

            dateDisplay.innerText =
                dateInput.value;

        }

    }

}