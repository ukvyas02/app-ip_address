class IpAddress {
  constructor() {
    // IAP's global log object is used to output errors, warnings, and other
    // information to the console, IAP's log files, or a Syslog server.
    // For more information, consult the Log Class guide on the Itential
    // Developer Hub https://developer.itential.io/ located
    // under Documentation -> Developer Guides -> Log Class Guide
    log.info('Starting the IpAddress product.');
  }

/**
 * Calculate and return the first host IP address from a CIDR subnet.
 * @param {string} cidrStr - The IPv4 subnet expressed
 *                 in CIDR format.
 * @param {callback} callback - A callback function.
 * @return {string} (firstIpAddress) - An IPv4 address.
 */
 getFirstIpAddress(cidrStr, callback) {

  // Initialize return arguments for callback
  let firstIpAddress = null;
  let callbackError = null;

  // Instantiate an object from the imported class and assign the instance to variable cidr.
  const cidr = new IPCIDR(cidrStr);
  // Initialize options for the toArray() method.
  // We want an offset of one and a limit of one.
  // This returns an array with a single element, the first host address from the subnet.
  const options = {
    from: 1,
    limit: 1
  };

  // Use the object's isValid() method to verify the passed CIDR.
  if (!cidr.isValid()) {
    // If the passed CIDR is invalid, set an error message.
    callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress.';
  } else {
    // If the passed CIDR is valid, call the object's toArray() method.
    // Notice the destructering assignment syntax to get the value of the first array's element.
    [firstIpAddress] = cidr.toArray(options);
   
  }

// var jsonString = "{\"key\":\"value\"}";
let ipv6ip=null;

if(firstIpAddress!=null){
  ipv6ip=getIpv4MappedIpv6Address(firstIpAddress);
}

 let jsonObj =  {
                    ipv4: firstIpAddress,
                    ipv6: ipv6ip
                };

//var jsonObj = JSON.parse(jsonString);
//console.log("test111111111"+ jsonObj.ipv4);
 
  // Call the passed callback function.
  // Node.js convention is to pass error data as the first argument to a callback.
  // The IAP convention is to pass returned data as the first argument and error
  // data as the second argument to the callback function.

    
  
  return callback(jsonObj, callbackError);
}

  
}

module.exports = new IpAddress;
