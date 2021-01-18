export default function isRetFile(filename: string): boolean {
  const filenameOnArray = filename.split('');

  const extension = `${filenameOnArray[filenameOnArray.length - 3]}${
    filenameOnArray[filenameOnArray.length - 2]
  }${filenameOnArray[filenameOnArray.length - 1]}`;

  if (extension !== 'ret') {
    return false;
  }

  return true;
}
