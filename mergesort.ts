// @ts-ignore
let fs = require('fs')
// @ts-ignore
let fileName:string = process.argv[2]
// @ts-ignore
let sortToken:number = parseInt(process.argv[3])

function merge(arr, l, m, r)
{
    let len1:number = m - l + 1;
    let len2:number = r - m;

    // Create temp arrays
    let leftArray:Array<Array<string>> = new Array(len1);
    let rightArray:Array<Array<string>> = new Array(len2);

    // Copy data to temp arrays leftArray and rightArray
    for (let i:number = 0; i < len1; i++){
        leftArray[i] = arr[l + i];
    }

    for (let j:number = 0; j < len2; j++){
        rightArray[j] = arr[m + 1 + j];
    }


    // Merge the temp arrays back into arr[l..r]

    // Initial index of left subarray
    let i:number = 0;

    // Initial index of right subarray
    let j:number = 0;

    // Initial index of merged subarray
    let k:number = l;

    while (i < len1 && j < len2) {
        if (leftArray[i][sortToken] <= rightArray[j][sortToken]) {
            arr[k] = leftArray[i];
            i++
        }
        else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of leftArray[], if there are any
    while (i < len1) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    // Copy the remaining elements of rightArr[], if there are any
    while (j < len2) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

function mergeSort(arr,l, r){
    if(l>=r){
        return;
    }
    var m:number =l+ Math.floor((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}


fs.readFile(fileName,function (err, data){
    let fileArr:Array<String> = data.toString().split('\n')
    let sepArr:Array<Array<String>> = []
    for(let i in fileArr){
        sepArr.push(fileArr[i].split(', '))
    }
    console.log(`Before Sort: ${sepArr}`)
    mergeSort(sepArr, 0, sepArr.length-1)
    console.log(`After Sort: ${sepArr}`)
})

