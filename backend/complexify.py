import os
import csv
from PIL import Image
from fractions import Fraction
from transformers import BlipProcessor, BlipForConditionalGeneration
from config import OPENAI_API_KEY
import json

# Load BLIP model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Function to get dimensions of an image
def get_image_dimensions(image_path):
    with Image.open(image_path) as img:
        return img.width, img.height

# Function to compute the aspect ratio of an image
def compute_aspect_ratio(width, height):
    return Fraction(width, height).limit_denominator()

# Function to get file size in MB
def get_file_size_mb(file_path):
    return os.path.getsize(file_path) / (1024 * 1024)

# Function to write a CSV file
def write_csv(csv_file, csv_data):
    with open(csv_file, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Filename", "Type", "Number of Frames", "Height in Pixels", "Width in Pixels", "File Size in MB", "Description"])
        writer.writerows(csv_data)

# Function to get image caption using BLIP
def get_image_caption(image_path):
    raw_image = Image.open(image_path).convert('RGB')
    inputs = processor(raw_image, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)
    return caption

# Main function
def main():
    # Define the directory containing the extracted files
    current_dir = os.path.dirname(os.path.abspath(__file__))
    extract_dir = os.path.join(current_dir, 'images')

    # List the contents of the extracted directory
    extracted_files = os.listdir(extract_dir)

    # Prepare data for the CSV
    csv_data = []

    for file in extracted_files:
        file_path = os.path.join(extract_dir, file)
        file_size_mb = get_file_size_mb(file_path)
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            width, height = get_image_dimensions(file_path)
            description = get_image_caption(file_path)
            frames = 1
            csv_data.append([file, 'Image', frames, height, width, file_size_mb, description])

    # Write the CSV file
    csv_file = os.path.join(current_dir, 'output.csv')
    write_csv(csv_file, csv_data)
    json_string = '{"name": "John", "age": 30, "city": "New York"}'
    parsed_data = json.loads(json_string)
    print(parsed_data)  # This will be a Python dictionary


# Run the main function
if __name__ == "__main__":
    main()