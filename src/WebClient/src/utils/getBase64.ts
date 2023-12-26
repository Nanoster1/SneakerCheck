export default function getBase64 (file: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  })
}

export function getBytesFromBase64(base64: string) {
  const bytesStarts = base64.indexOf(',')
  return base64.slice(bytesStarts + 1)
}

export function getFormatFromBase64(base64: string) {
  const dataEnd = base64.indexOf(';')
  const data = 'data:'
  return base64.slice(data.length, dataEnd)
}
