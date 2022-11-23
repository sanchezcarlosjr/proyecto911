export class Cypher {
    constructor() {
    }
    encode(str: any) {
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }
    encodeBase64(str: any) {
        const buff = Buffer.from(str, 'utf-8');
        return buff.toString('base64');
    }
    encrypt(str: string) {
        return this.encodeBase64(this.xor(this.encode(str)));
    }
    xor(input: any) {
        const output = new Int32Array(input.length);
        const secret = this.encode(process.env.CYPHER_KEY);
        let spos = 0;
        input.forEach((value: any, pos: number) => {
            output[pos] = input[pos] ^ secret[spos];
            spos++;
            if (spos >= secret.length) {
                spos = 0;
            }
        });
        return output;
    }
}
