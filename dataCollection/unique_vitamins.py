import json

# Load JSON file
with open('food_vitamin_values.json') as f:
    data = json.load(f)

# Extract unique values from the "bilesen" field
unique_bilesen = set(item['bilesen'] for item in data)

# Print unique values
print("Unique items in the 'bilesen' field:")
for item in unique_bilesen:
    print(item)