onclick = () => {
    counter = document.querySelector('.checkOut');
    if (counter.innerText > 0)
        counter.classList.remove('d-none');
    else
        counter.classList.add('d-none');
}

function showIcon(icon) {
    icon.classList.remove('opacity-50');
}

function blurIcon(icon) {
    icon.classList.add('opacity-50');
}

function toggleListItem(item) {
    parentList = item.parentNode.querySelectorAll(".listItem");
    if (item.classList.contains('bg-grey')) {
        item.classList.remove('bg-grey');
    }
    else {
        parentList.forEach(listItem => listItem.classList.remove('bg-grey'));
        item.classList.add('bg-grey');
    }
}

function addToCart(data) {
    let counter = +document.querySelector('.checkOut').innerText;
    counter++;
    document.querySelector('.checkOut').innerText = counter;
    data.button.onclick = null;

    let selectedProductsList = document.querySelector('#selectedProductsList');
    let product = selectedProductsList.children[0].cloneNode(true);
    product.classList.remove('d-none');
    product.id = data.id;
    product.children[0].children[0].src = data.imgSrc;
    product.children[1].children[0].innerText = data.productName;
    product.children[1].children[1].children[0].children[0].innerText = data.productPrice;
    product.children[1].children[1].children[1].children[0].innerText = data.productPrice;
    product.children[1].children[2].children[0].innerText = 1;
    if (selectedProductsList.children.length < 3) {
        product.children[1].children[4].removeAttribute("data-bs-toggle");
        product.children[1].children[4].removeAttribute("data-bs-target");
    }
    selectedProductsList.appendChild(product);
}

function selectProduct(link) {
    let product = link.parentNode.parentNode;
    let source = product.children[0].src;
    let title = product.children[1].innerText;
    let price = product.children[3].children[0].children[0].innerText;
    let data = {
        imgSrc: source,
        productName: title,
        productPrice: price,
        id: product.id,
        button: link
    };
    addToCart(data);
}

function selectOffer(link) {
    let product = link.parentNode;
    let source = product.children[0].src;
    let title = product.children[1].innerText;
    let price = product.children[3].children[0].innerText;
    let data = {
        imgSrc: source,
        productName: title,
        productPrice: price,
        id: product.id,
        button: link
    };
    addToCart(data);
}

function addItem(link) {
    let node = link.parentNode;
    let priceForItem = node.children[1].children[0].children[0].innerText;
    let numberOfItems = node.children[2].children[0].innerText;
    let totalPrice = node.children[1].children[1].children[0];

    numberOfItems = ++node.children[2].children[0].innerText;
    totalPrice.innerText = priceForItem * numberOfItems;
    node.children[4].removeAttribute("data-bs-toggle");
    node.children[4].removeAttribute("data-bs-target");

    if (numberOfItems > 5 && numberOfItems <= 10)
        confirm('Are you sure you want to add one more item ?');
    if (numberOfItems > 10) {
        alert("You can't add anymore items !!");
        numberOfItems = --node.children[2].children[0].innerText;
        totalPrice.innerText = priceForItem * numberOfItems;
    }
}

function removeItem(link) {
    let node = link.parentNode;
    let numberOfItems = node.children[2].children[0].innerText;
    let priceForItem = node.children[1].children[0].children[0].innerText;
    let totalPrice = node.children[1].children[1].children[0];

    numberOfItems = --node.children[2].children[0].innerText;
    totalPrice.innerText = priceForItem * numberOfItems;

    if (node.parentNode.parentNode.children.length <= 2 && numberOfItems < 2) {
        link.setAttribute("data-bs-toggle", "modal");
        link.setAttribute("data-bs-target", "#checkOut");
    }

    if (numberOfItems <= 0) {
        if (confirm("Are you sure want to remove this item ?")) {
            document.querySelector('.checkOut').innerText--;
            node.parentNode.remove();
        }
        else {
            numberOfItems = ++node.children[2].children[0].innerText;
            totalPrice.innerText = priceForItem * numberOfItems;
        }
    }
}

function setIds() {
    let productList = document.querySelector('#productList');
    let alpha = ['a', 'b', 'c', 'd', 'e'];
    let num = ['1', '2', '3', '4', '5'];
    for (i = 0; i < productList.children.length; i++)
        for (j = 0; j < productList.children[0].children[0].children.length; j++)
            productList.children[i].children[0].children[j].id = alpha[i] + '_' + num[j];


    let offersList = document.querySelector('#offersList');
    let alphas = ['n', 'o', 'p', 'q', 'r'];
    let nums = ['14', '15', '16', '17', '18'];
    for (i = 0; i < offersList.children.length; i++)
        for (j = 0; j < offersList.children[0].children.length; j++)
            offersList.children[i].children[j].id = alphas[i] + '_' + nums[j];
}

function calculateTotalCost() {
    let finalCost = document.querySelector('#finalCost').children[0];
    let cost = 0;
    let selectedProductsList = document.querySelector('#selectedProductsList');
    for (let i = 0; i < selectedProductsList.children.length; i++) {
        cost += +selectedProductsList.children[i].children[1].children[1].children[1].children[0].innerText;
    }
    finalCost.innerText = cost;
}

function selectItem(link) {
    let product = link.parentNode.parentNode.parentNode;
    let source = product.children[0].src;
    let title = product.children[1].children[1].innerText;
    let price = product.children[1].children[2].children[0].children[0].innerText;
    let data = {
        imgSrc: source,
        productName: title,
        productPrice: price,
        id: product.id,
        button: link
    };
    addToCart(data);
}