/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/Worklist",
	"./pages/Browser",
	"./pages/Object",
	"./pages/App",
	"./pages/NewProduct"
], function (opaTest) {
	"use strict";

	QUnit.module("Object");

	opaTest("Should see the 'New Product' view after pressing the 'Add' button", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		//Actions
		When.onTheWorklistPage.iPressAdd();
		//Assertions
		Then.onTheNewProductPage.iShouldSeeThePage().and.iTeardownMyApp();
	});
});