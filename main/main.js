"use strict";
const DECIMAL_PLACES = 2;

module.exports = function main() {
    console.log("Debug Info");

    const productList = arguments[0];

    const productNames = Array.from(new Set(
    	productList.map(arg=>arg.Name)
    	));

    let inventoryText = "***<store earning no money>Receipt ***\n";
    for(let productName of productNames){
    	inventoryText+=formattedProductName(productName, productList);
    }
    inventoryText+=footer(productList);
    
    return inventoryText;
};

function formattedProductName(productName, productList){
	const matchingProduct = productList
		.filter(product=>product.Name===productName)
		[0];

	const quantity = productList
		.filter(product=>product.Name === productName)
		.length;

	const price = (matchingProduct.Price).toFixed(DECIMAL_PLACES);
	const subTotal = (quantity*matchingProduct.Price).toFixed(DECIMAL_PLACES);

	return `Name: ${matchingProduct.Name}, `+
	`Quantity: ${quantity}${parseUnit(matchingProduct, quantity)}, `+
	`Unit price: ${price} (yuan), `+
	`Subtotal: ${subTotal} (yuan)`+
	`\n`;
}

function parseUnit(matchingProduct, quantity){
	const unit = matchingProduct.Unit;
	if(unit==='a'){
		return "";
	}

	if(quantity>1){
		return " "+unit+"s";
	}

	return " "+unit;
}

function footer(productList){
	let inventoryText = "----------------------\n";
    inventoryText+=`Total: ${getTotal(productList)} (yuan)\n`
    inventoryText+="**********************\n";

    return inventoryText;
}

function getTotal(productList){
	return productList
		.map(product=>product.Price)
		.reduce((a, b)=>a+b, 0)
		.toFixed(DECIMAL_PLACES);
}

