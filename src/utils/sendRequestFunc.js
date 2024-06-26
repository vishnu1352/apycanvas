async function sendRequestFunc(url = "", method, data = {}) {
    // Create the options object
    let options = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *client
    };
  
    // Add body to the request if method is not GET or HEAD
    if (method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(data); // body data type must match "Content-Type" header
    }
  
    // Await the fetch call to get the response
    const response = await fetch(url, options);
  
    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
  
    // Return the response parsed as JSON
    return await response.json();
  }
  
  export default sendRequestFunc;
  