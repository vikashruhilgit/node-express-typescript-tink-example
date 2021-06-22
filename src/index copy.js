import * as tink from "tink-crypto";

console.log(tink)

const key = {
  keys: [
    {
      keyValue:
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIsFro6K+IUxRr4yFTOTO+kFCCEvHo7B9IOMLxah6c977oFzX/beObH4a9OfosMHmft3JJZ6B3xpjIb8kduK4/A==",
      protocolVersion: "ECv1",
    },
    {
      keyValue:
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGnJ7Yo1sX9b4kr4Aa5uq58JRQfzD8bIJXw7WXaap/hVE+PnFxvjx4nVxt79SdRuUVeu++HZD0cGAv4IOznc96w==",
      protocolVersion: "ECv2",
      keyExpiration: "2154841200000",
    },
    {
      keyValue:
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGnJ7Yo1sX9b4kr4Aa5uq58JRQfzD8bIJXw7WXaap/hVE+PnFxvjx4nVxt79SdRuUVeu++HZD0cGAv4IOznc96w==",
      protocolVersion: "ECv2SigningOnly",
      keyExpiration: "2154841200000",
    },
  ],
};
const data =
  '{"signature":"MEQCIDOlDHp6o7KOd55QzqcT+MfHJK7Rs/vkk5kIposjv9ePAiByZrBk/ZkR8HauaR8aa1lJttYPY15Eyg6XSjiMRTo4gg\\u003d\\u003d","intermediateSigningKey":{"signedKey":"{\\"keyValue\\":\\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExpYImo+EQHXdRxmPRCKuvAFXfA92wybYlWnJLdNITDk+nabwHGCf2Zm2O/lghTC0Tbfo/HUMdD2UXoDz8gRDfA\\\\u003d\\\\u003d\\",\\"keyExpiration\\":\\"1624681159209\\"}","signatures":["MEYCIQDHAlyfcFSi9Yr5e7X08gCA1NNDrvkX1Sk98Hcr3Gnt2wIhAMnSIl5OkvQRH/YKgDxV2scHIuOYkGUei9E15VI6qveO"]},"protocolVersion":"ECv2","signedMessage":"{\\"encryptedMessage\\":\\"DfVZE/6A8+ARbn/tJBBdMxFhYcDiajmt8+gPY/D1HCJWzeMbdyaXsr7l2xE7mK5W/K9CGhomWGlHji6fnBOp+Y0aEBhJ7zkuiBizwnS7iIrYwKaPx5gEt6Ftqsxyv6UPJFhRwUvnhHOo49daDksB9FTVXFrxQ1faFOMmHWKQugzZ2Ift1mHs2tb2lLPNxfANTlNDXxr6isFs2QY11FoI5RBmAVVGMK1OjbLoBAunUINKTFk59hbmDMKFwpWXmL/1kdo5HNMddaS53g/wkfw097ZQs3VJG5uYybq4qL1LtL48Dv4tgHwWNJ/m14wxXgBZ0KK8IxQA/IWzaZVXM0kBsCdFQ5rq63Tdu6UYHwMnaBRCXxEv0Qk7G9dPkxPOYuwjzSDuNeeyG5R56ppWTBnz/sYZIFgXnHQQNSR6cOzD93GfldG2iRfESpiSI88\\\\u003d\\",\\"ephemeralPublicKey\\":\\"BM2lh03NFBqFE30+W5oJtXKYxpKXxtWoRaqdRndHI5xlpPLH+BrCx06tv7JSgfbaR/f5ptugZEQGmY9mLH3SrMc\\\\u003d\\",\\"tag\\":\\"lnkKKqZX3T6n5yyWMFuEqX88Ga+duNiLydwY0Io4sNU\\\\u003d\\"}"}';

const initialValue = "hello";
console.log(initialValue, "'initialValue'");
var bytes = getBytes(initialValue);
console.log(bytes, "getBytes");
const ciphertext = new Uint8Array(bytes);
console.log(ciphertext, "Uint8Array");
const tempKey = new Uint8Array([0]);

tink.aead.register();

const handler = async () => {
  // const keyHandler = await tink.generateNewKeysetHandle(tink.aead.aes128GcmKeyTemplate());
  const keyHandler = await tink.generateNewKeysetHandle(
    tink.aead.aes128GcmKeyTemplate()
  );

  const crypto = await keyHandler.getPrimitive(tink.aead.Aead);
  // const res = await crypto.decrypt(ciphertext, tempKey);
  const encryptValue = await crypto.encrypt(ciphertext, tempKey);
  console.log(encryptValue, "encryptValue");

  const decryptValue = await crypto.decrypt(encryptValue, tempKey);
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
