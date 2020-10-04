export function getMaximumValue(arr, getValue = id => id) {
    let max = arr.length > 0 ? getValue(arr[0]) : undefined;

    for (let i = 1; i < arr.length; i++) {
      const v = getValue(arr[i]);

      if (max < v) {
        max = v;
      }
    }

    return max;
}
