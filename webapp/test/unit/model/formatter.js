/*global QUnit*/

sap.ui.define([
	"opensap/manageproducts/ManageProducts/model/formatter",
	"../helper/FakeI18nModel",
	"opensap/manageproducts/ManageProducts/constants",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (formatter, FakeI18nModel, constants) {
	"use strict";

	QUnit.module("Number unit");

	function numberUnitValueTestCase(assert, sValue, fExpectedNumber) {
		// Act
		var fNumber = formatter.numberUnit(sValue);

		// Assert
		assert.strictEqual(fNumber, fExpectedNumber, "The rounding was correct");
	}

	QUnit.test("Should round down a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.123", "3.12");
	});

	QUnit.test("Should round up a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.128", "3.13");
	});

	QUnit.test("Should round a negative number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "-3", "-3.00");
	});

	QUnit.test("Should round an empty string", function (assert) {
		numberUnitValueTestCase.call(this, assert, "", "");
	});

	QUnit.test("Should round a zero", function (assert) {
		numberUnitValueTestCase.call(this, assert, "0", "0.00");
	});

	QUnit.module("Delivery", {

		deliveryMethods: {
			mail: "mail",
			parcel: "parcel",
			carrier: "carrier"
		},

		beforeEach: function () {
			let oControllerStub = {
				getModel: sinon.stub().withArgs("i18n").returns(new FakeI18nModel({
					formatterMailDelivery: this.deliveryMethods.mail,
					formatterParcelDelivery: this.deliveryMethods.parcel,
					formatterCarrierDelivery:this.deliveryMethods.carrier
				}))
			};

			this.fnIsolatedFormatter = formatter.deliveryMethod.bind(oControllerStub);
		},

		afterEach: function () {
			this.fnIsolatedFormatter = null;
		}
	});

	QUnit.test("Delivery method mail should be returned.", function (assert) {
		assert.strictEqual(this.fnIsolatedFormatter(0.499, constants.KILOGRAM_WEIGHT_UNIT), this.deliveryMethods.mail, "Mail delivery method not returned.");
		assert.strictEqual(this.fnIsolatedFormatter(499, constants.GRAM_WEIGHT_UNIT), this.deliveryMethods.mail, "Mail delivery method not returned.");
	});

	QUnit.test("Delivery method parcel should be returned.", function (assert) {
		assert.strictEqual(this.fnIsolatedFormatter(4.99, constants.KILOGRAM_WEIGHT_UNIT), this.deliveryMethods.parcel, "Parcel delivery method not returned.");
		assert.strictEqual(this.fnIsolatedFormatter(4999, constants.GRAM_WEIGHT_UNIT), this.deliveryMethods.parcel, "Parcel delivery method not returned.");
	});

	QUnit.test("Delivery method carrier should be returned.", function (assert) {
		assert.strictEqual(this.fnIsolatedFormatter(5.1, constants.KILOGRAM_WEIGHT_UNIT), this.deliveryMethods.carrier, "Carrier delivery method not returned.");
		assert.strictEqual(this.fnIsolatedFormatter(5001, constants.GRAM_WEIGHT_UNIT), this.deliveryMethods.carrier, "Carrier delivery method not returned.");
	});
});