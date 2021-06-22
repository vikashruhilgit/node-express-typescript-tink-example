import * as tink from "tink-crypto";

// console.log(tink)

const keyFull = '{"keys":[{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIsFro6K+IUxRr4yFTOTO+kFCCEvHo7B9IOMLxah6c977oFzX/beObH4a9OfosMHmft3JJZ6B3xpjIb8kduK4/A==","protocolVersion": "ECv1",},{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGnJ7Yo1sX9b4kr4Aa5uq58JRQfzD8bIJXw7WXaap/hVE+PnFxvjx4nVxt79SdRuUVeu++HZD0cGAv4IOznc96w==","protocolVersion": "ECv2","keyExpiration": "2154841200000",},{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGnJ7Yo1sX9b4kr4Aa5uq58JRQfzD8bIJXw7WXaap/hVE+PnFxvjx4nVxt79SdRuUVeu++HZD0cGAv4IOznc96w==","protocolVersion": "ECv2SigningOnly","keyExpiration": "2154841200000",},],}';

/* const key =
  'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg1ofVhC/pOI2qsyuQhlYJ9w2n0St3NORL+kiTa5YQ8eehRANCAATab2ADSUuqKlLTlaJHZuacyQxp0K3nf5Ouk1HZULPpbGa4mSyBcWWQBbiL6Enny4EmQr8YYJ/7Dj+UNdI1H4qf'; */

const key =
  '{"keyValue":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGnJ7Yo1sX9b4kr4Aa5uq58JRQfzD8bIJXw7WXaap/hVE+PnFxvjx4nVxt79SdRuUVeu++HZD0cGAv4IOznc96w==","protocolVersion": "ECv2","keyExpiration": "2154841200000",}';

const data =
  '{"signature":"MEUCIAmo0fq/Mt8BuBr9t4Y7n8cTVrLdKxo/1OOVMygvKH4KAiEAieTm49eY8E9K4mJsG08eUR1OCLyfZsmqStVs5CAqKYU\\u003d","intermediateSigningKey":{"signedKey":"{\\"keyValue\\":\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZBbvG8UrEIw9iGhCbjRe69HyI94xMShssCMAiwChzRsmfP1LgaGC0f5ZWS798CdjlOGRZ7qE9M7555s01MM8jQ\\\\u003d\\\\u003d\\",\\"keyExpiration\\":\\"1624599058706\\"}","signatures":["MEUCIAZzPX4aIfx7X4XLuEsM9hj9Hm+DuIZQHmkRSRQhRuOQAiEA8QZY7QRjCzc/7NNUjOEUeipxs5sIPZxtmNNwf9mpLHo\\u003d"]},"protocolVersion":"ECv2","signedMessage":"{\\"encryptedMessage\\":\\"aNcq5V5R/zxAn7yZrd/HU+SMmv4m8yLAEfKiYvSbb5n4NX4v3IHBiu+nsmfsVKXDDbF4jQNm7GwDVVBYTV+KWs2mdvMuqYdvh6bZqufWW7bIjiHOKhangT+S57m8MkF0iQ3Wa1XuDrbkZxl++PY2ZL+QkmI3iainkkgA36C8mKBcy9UGYzlRzCuPImNretIVKCOZq/ynzzFLHrSdEEp/QjX3BlCFludiJK5hnEbAielk28EWq0OfApS+H5zefQ1zKLLrhE6NZrT/KzMSnj+mZggsz1pIOGrvbFs1y3zbOXCp+8KZbWe0t1eMe8V2b2+M3tzpzSCrKFgnvHHiYqPCWB3rJf0q03WE7HbvkCv3wUA362nlMXl/zj76G33WPpAUqYyzqu3WDhomyyvXSRGsMNlzDsrTZpUXjSHOqyu7exY96wrJ0mnav2EdO8Q\\\\u003d\\",\\"ephemeralPublicKey\\":\\"BIg6j2Kq+as50M5ktnPXl3M8zDhB0OzhF36UC26+SnCOFUSqnioQRDKlxeLUdRWwMvwzkgjvshvNf+jcTQnYYjQ\\\\u003d\\",\\"tag\\":\\"io3aU/kEtQ/8igKuj4uD9v6mu60vYmmaWiB/UlbN/eI\\\\u003d\\"}"}';

//KeysetHandle keysetHandle =  CleartextKeysetHandle.read(JsonKeysetReader.withFile(new File("tinkkey.json")));

tink.hybrid.HybridDecrypt


//const initialValue = "hello";
const initialValue = data;
console.log(initialValue, "'initialValue'");
var bytes = getBytes(initialValue);
console.log(bytes, "getBytes");
const ciphertext = new Uint8Array(bytes);
console.log(ciphertext, "Uint8Array");
const tempKey = new Uint8Array([0]);
const keyBuff = new Uint8Array(getBytes(key));

tink.aead.register();

console.log(tink.binary.deserializeNoSecretKeyset(keyBuff), 'oooooooooooooooooo');

const handler = async () => {
  // const keyHandler = await tink.generateNewKeysetHandle(tink.aead.aes128GcmKeyTemplate());
  const keyHandler = await tink.generateNewKeysetHandle(
    tink.aead.aes256CtrHmacSha256KeyTemplate()
  );

  const crypto = await keyHandler.getPrimitive(tink.aead.Aead);

  /* const encryptValue = await crypto.encrypt(ciphertext, keyBuff);
  console.log(encryptValue, "encryptValue"); */

  const decryptValue = await crypto.decrypt(ciphertext, keyBuff);
  console.log(decryptValue, "decryptValue");

  const finalValue = getString(decryptValue);
  console.log(finalValue, "'finalValue'");
};

handler();

function getString(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function getBytes(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
