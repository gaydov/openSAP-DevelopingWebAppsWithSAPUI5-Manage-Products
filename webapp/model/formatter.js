sap.ui.define([
	"../constants"
	], function (constants) {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		deliveryMethod: function (fWeight, sMeasure) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			var sResult = "";
			var fProductWeight = fWeight;

			if (sMeasure === constants.GRAM_WEIGHT_UNIT) {
				fProductWeight = fProductWeight / 1000;
			}

			if (fProductWeight < constants.MAIL_DELIVERY_WEIGHT) {
				sResult = oResourceBundle.getText("formatterMailDelivery");
			} else if (fProductWeight < constants.PARCEL_DELIVERY_WEIGHT) {
				sResult = oResourceBundle.getText("formatterParcelDelivery");
			} else {
				sResult = oResourceBundle.getText("formatterCarrierDelivery");
			}

			return sResult;
		},

		/**
		 * Formats an address to a static google maps image
		 * @public
		 * @param {string} sStreet the street
		 * @param {string} sZIP the postal code
		 * @param {string} sCity the city
		 * @param {string} sCountry the country
		 * @returns {string} sValue a google maps URL that can be bound to an image
		 */
		formatMapUrl: function (sStreet, sZIP, sCity, sCountry) {

			let sUrl = "";
			sUrl = "https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=640x640&markers=" + jQuery.sap.encodeURL(sStreet + ", " + sZIP +
				" " + sCity + ", " + sCountry);

			return sUrl;
		}
	};

});