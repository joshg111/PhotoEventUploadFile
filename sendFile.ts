import * as fs from 'fs';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
// const URL = 'https://s3.amazonaws.com/photoevent-photos';

const SIGNED_URL = 'https://m7cgx2oef7.execute-api.us-east-1.amazonaws.com/dev/hello';


axios.post(SIGNED_URL).then(resp => {
  const data = resp.data.data;

  const uploadUrl = data.url;
  const fields = <Object>data.fields;
  console.log(fields);

  // let buff = new Buffer(<string>data.fields.Policy, 'base64');
  // let policy = buff.toString('ascii');
  // console.log(policy);

  const formData = new FormData();

  Object.keys(fields).forEach(key => console.log(key.toLocaleLowerCase()));
  Object.keys(fields).forEach(key => { formData.append(key, fields[key]); });

  const file = fs.readFileSync('/Users/jgreenf/Desktop/bill.png');
  formData.append('file', file);

  const config = {
    url: uploadUrl,
    method: 'post',
    headers: {
        'content-type': 'multipart/form-data'
    },
    // data: formData.getBuffer()
  };

  
  formData.submit(uploadUrl, function(err, res) {
    if(err) {
      console.log(err);
    } else {
      res.resume();
      console.log(res.statusMessage);
    }
  });
});

// return axios(<AxiosRequestConfig>config)
//   .then(result => {
//     console.log(result);
//   }, err => {
//     console.log(err);
//   });
// }, err => {
//   console.log(err);
// });

// const fields = JSON.parse(`{
//   "Content-Type": "image/png",
//   "key": "1586046340.846_5d4eb7k8mb1gxc",
//   "bucket": "photoevent-photos",
//   "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
//   "X-Amz-Credential": "ASIAXIYERCXIJSYEKOTK/20200405/us-east-1/s3/aws4_request",
//   "X-Amz-Date": "20200405T002540Z",
//   "X-Amz-Security-Token": "IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJFMEMCH0/cuw1SmwapJchj/RUK/lh80FvGhZ4TnHLk/PQpWKICIHjxsiHUAyaGh+85QasF1V9lXX0vIAdqmaaNCaBNV9lfKt8BCIL//////////wEQARoMNDk5ODM2MzI3Mzc2IgwU6RzfeTTmisFAVqUqswG5j6P5pIZ0yhT7gMQYk50cWmMkvs8fC6YBwpPBfLFrvvofMBMNCuRVUgtWSPe7qerTFpjqPVU+HYpPoi8Ntn/0gJHNN2TYMF99DB/CdlGx0dStGhnywnn+nilrlmH1BNS2QPvse50js3rc+IPZ/BzWRkRR/HHnLTVWezfvpSm0SSAA/7MxPavgTcDbDCjmJpThDgQru6+V/NziM/UMkvxdheI1xhFroQPPPysqdk00Q8BARzCEy6T0BTriAX6jTX8l3WhkWlU8Tns/Na50H/rWG0JiwMX8aH/VU9hmST8ifqtLOqz92sO5hASp03dYYzfBOS7jFsEt1YO2oJRkNTkmhdODcVCCuEpLuIkYPVPiugme1+LkFrs05vVqKXdRD4/FYrYi8v2KYDrvS8rmu/eMG5l6YYy7q2Y3gVeuWfr+7yMPfNwIL80Gta8LjPUWp5eR1uH61zZgAYMnA+n51CjqRDGGPPTPCccSnWoPJhM2zes0wz0Pp/TFlbzEui8ZmZxUkdVvjMDscO/AcZc9EOx4IKUKF5RDlGi1PVKt+IY=", Policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wNC0wNVQwMDoyNjo0MFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMTAwLDEwMDAwMDAwXSx7IkNvbnRlbnQtVHlwZSI6ImltYWdlL3BuZyJ9LHsia2V5IjoiMTU4NjA0NjM0MC44NDZfNWQ0ZWI3azhtYjFneGMifSx7ImJ1Y2tldCI6InBob3RvZXZlbnQtcGhvdG9zIn0seyJYLUFtei1BbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJYLUFtei1DcmVkZW50aWFsIjoiQVNJQVhJWUVSQ1hJSlNZRUtPVEsvMjAyMDA0MDUvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjAwNDA1VDAwMjU0MFoifSx7IlgtQW16LVNlY3VyaXR5LVRva2VuIjoiSVFvSmIzSnBaMmx1WDJWakVIa2FDWFZ6TFdWaGMzUXRNU0pGTUVNQ0gwL2N1dzFTbXdhcEpjaGovUlVLL2xoODBGdkdoWjRUbkhMay9QUXBXS0lDSUhqeHNpSFVBeWFHaCs4NVFhc0YxVjlsWFgwdklBZHFtYWFOQ2FCTlY5bGZLdDhCQ0lMLy8vLy8vLy8vL3dFUUFSb01ORGs1T0RNMk16STNNemMySWd3VTZSemZlVFRtaXNGQVZxVXFzd0c1ajZQNXBJWjB5aFQ3Z01RWWs1MGNXbU1rdnM4ZkM2WUJ3cFBCZkxGcnZ2b2ZNQk1OQ3VSVlVndFdTUGU3cWVyVEZwanFQVlUrSFlwUG9pOE50bi8wZ0pITk4yVFlNRjk5REIvQ2RsR3gwZFN0R2hueXdubituaWxybG1IMUJOUzJRUHZzZTUwanMzcmMrSVBaL0J6V1JrUlIvSEhuTFRWV2V6ZnZwU20wU1NBQS83TXhQYXZnVGNEYkRDam1KcFRoRGdRcnU2K1YvTnppTS9VTWt2eGRoZUkxeGhGcm9RUFBQeXNxZGswMFE4QkFSekNFeTZUMEJUcmlBWDZqVFg4bDNXaGtXbFU4VG5zL05hNTBIL3JXRzBKaXdNWDhhSC9WVTlobVNUOGlmcXRMT3F6OTJzTzVoQVNwMDNkWVl6ZkJPUzdqRnNFdDFZTzJvSlJrTlRrbWhkT0RjVkNDdUVwTHVJa1lQVlBpdWdtZTErTGtGcnMwNXZWcUtYZFJENC9GWXJZaTh2MktZRHJ2UzhybXUvZU1HNWw2WVl5N3EyWTNnVmV1V2ZyKzd5TVBmTndJTDgwR3RhOExqUFVXcDVlUjF1SDYxelpnQVlNbkErbjUxQ2pxUkRHR1BQVFBDY2NTbldvUEpoTTJ6ZXMwd3owUHAvVEZsYnpFdWk4Wm1aeFVrZFZ2ak1Ec2NPL0FjWmM5RU94NElLVUtGNVJEbEdpMVBWS3QrSVk9In1dfQ==",
//   "X-Amz-Signature": "77ee797e9a53be7b14eb281544c390348cd6f229414679ba3cd2ad86fd345c42"
// }`);


// const formData = new FormData();

// fields.entries().forEach(entry => { formData.append(entry, fields[entry]); });

// // const file = fs.readSync();

// // formData.append('file', file);

// const config = {
//   url: URL,
//   method: 'post',
//   headers: {
//       'content-type': 'multipart/form-data'
//   },
//   data: formData
// };

// axios(<AxiosRequestConfig>config)
// .then(result => {
//   console.log(result);
// }, err => {
//   console.log(err);
// });

