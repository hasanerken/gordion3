const MyPlugin = {
  install(app) {
    app.config.globalProperties.turkishLira = value => {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY"
      }).format(value);
    };
    app.config.globalProperties.formatPhoneNumber = value => {
      let formattedNumber;
      if (value.length === 11) {
        let a = value.substring(0, 1);
        let b = value.substring(1, 4);
        let c = value.substring(4, 7);
        let d = value.substring(7, 11);
        formattedNumber = a + " " + b + " " + c + " " + d;
      } else if (value.length === 7) {
        let a = value.substring(0, 3);
        let b = value.substring(3, 5);
        let c = value.substring(5, 7);
        formattedNumber = a + " " + b + " " + c;
      } else {
        formattedNumber = value;
      }

      return formattedNumber;
    };
    app.config.globalProperties.huid = length => {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
        ""
      );
      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }
      var str = "";
      for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    };
    app.config.globalProperties.sortObject = unsortedItems => {
      let sortedItems = {};
      Object.keys(unsortedItems)
        .sort((a, b) => unsortedItems[a].position - unsortedItems[b].position)
        .forEach(key => (sortedItems[key] = unsortedItems[key]));
      return sortedItems;
    };
  }
};

export default MyPlugin;
