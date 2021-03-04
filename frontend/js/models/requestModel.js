class RequestModel {
    static filelessRequest(type, address, expectedStatus, dataToSend, needsAuth) { // model for a request that has no file
        return new Promise(function(resolve, reject) {

            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == expectedStatus) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != expectedStatus) {

                    reject(request.responseText);

                }
            }

            request.open(type, APIURL + "/api" + address);
            request.setRequestHeader("Content-Type", "application/json");
            if (needsAuth) {
                request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("sessionToken"));
            }
            request.send(dataToSend);
        })
    }
    static withFileRequest(type, address, expectedStatus, dataToSend, needsAuth) { // model for a request that has a file
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == expectedStatus) {

                    resolve(request.responseText);

                } else if (this.readyState == XMLHttpRequest.DONE && this.status != expectedStatus) {

                    reject(request.responseText);
                }
            }
            request.open(type, APIURL + "/api" + address);
            // request.setRequestHeader("Content-Type", "application/json");
            if (needsAuth) {
                request.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("sessionToken"));
            }
            request.send(dataToSend);
        })
    }
}