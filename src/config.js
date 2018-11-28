export default {
    key : "fc7424d6c38073f984212eaf501c3a54",
    baseEndPoint: "https://api.themoviedb.org",
    imageBasePath: "https://image.tmdb.org/t/p/",
    thumbnailDimension : "w185_and_h278_bestv2",
    posterDimesion : "w300_and_h450_bestv2",
    faceDimension : "w138_and_h175_face",
    mobilefaceDimension: "w120_and_h133_face",
    responseHandler : (response) => {
        return response.json().then((jsonRes) => {
            return Promise.resolve(jsonRes);
        }).catch(() => {
            return Promise.resolve(response);
        })
    },
    commify : function (amount) {
        if (typeof amount == "number") {
          amount = amount.toString();
        }
        var delimiter = ","; // replace comma if desired
        var a = amount.split(".", 2);
        var d = a[1] || "";
        var i = parseInt(a[0]);
        if (isNaN(i)) {
          return "";
        }
        var minus = "";
        if (i < 0) {
          minus = "-";
        }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while (n.length > 3) {
          var nn = n.substr(n.length - 3);
          a.unshift(nn);
          n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) {
          a.unshift(n);
        }
        n = a.join(delimiter);
        if (d.length < 1) {
          amount = n;
        } else {
          amount = n + "." + d;
        }
        amount = minus + amount;
        return amount;
      }
};