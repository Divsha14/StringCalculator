class StringCalculator {
    add(numbers) {
        if (numbers.length === 0) {
            return 0;
        }

        let delimiter = ",";
        let customDelimiter = numbers.match(/^\/\/(.+)\n/);

        if (customDelimiter) {
            delimiter = customDelimiter[1];
            numbers = numbers.substring(customDelimiter[0].length);
        }

        const numList = this.splitNumbers(numbers, delimiter + "|\n");
        return this.sum(numList);
    }

    splitNumbers(numbers, delimiter) {
        return numbers.split(new RegExp(delimiter));
    }

    convertToInt(num) {
        return parseInt(num, 10);
    }

    sum(numbers) {
        let total = 0;
        let negativeString = [];

        numbers.forEach(number => {
            const num = this.convertToInt(number);
            
            if (num < 0) {
                negativeString.push(num);
            }
            else {
                total += num;
            }
        });

        if (negativeString.length > 0) {
            throw new Error("Negatives not allowed: " + negativeString.join(", "));
        }

        return total;
    }
}

// Example Usage:
const calculator = new StringCalculator();
console.log(calculator.add("")); // Output: 0
console.log(calculator.add("1")); // Output: 1
console.log(calculator.add("1,5")); // Output: 6
console.log(calculator.add("//;\n1;2")); // Output: 3

// Testing negative number exception:
try {
    console.log(calculator.add("1,-2,3"));
} catch (e) {
    console.log(e.message); // Output: Negatives not allowed: -2
}

try {
    console.log(calculator.add("1,-2,-3"));
} catch (e) {
    console.log(e.message); // Output: Negatives not allowed: -2, -3
}