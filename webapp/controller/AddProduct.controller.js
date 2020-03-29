sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (BaseController, History, MessageToast) {
	"use strict";

	return BaseController.extend("opensap.manageproducts.ManageProducts.controller.AddProduct", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function () {
			this.getRouter().getRoute("addProduct").attachPatternMatched(this._onRouteMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onCreateProductSuccess: function (oProduct) {
			// navigate to the new product's object view
			var sProductID = oProduct.ProductID;
			this.getRouter().navTo("object", {
				objectId: sProductID
			}, true);

			// unbind the view to not show this object again
			this.getView().unbindObject();

			// show success messge
			var sMessage = this.getResourceBundle().getText("newObjectCreated", [oProduct.Name]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation: false
			});
		},

		_onMetadataLoaded: function () {
			// create default properties
			let oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
			};

			// create new entry in the model
			this._oContext = this.getModel().createEntry("/ProductSet", {
				properties: oProperties,
				success: this._onCreateProductSuccess.bind(this)
			});

			this.getView().setBindingContext(this._oContext);
		},

		_onRouteMatched: function () {
			let oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function () {
			this.onNavBack();
		},

		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function () {
			this.getModel().submitChanges();
		},

		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function () {
			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);

			let oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// a previous entry exists
				history.go(-1);
			} else {
				// probably wrong hash so navigate to the worklist and replace it
				this.getRouter().navTo("worklist", {}, true);
			}
		}
	});
});