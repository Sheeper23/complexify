import csv
import openai
import requests
import os
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, send_from_directory
from config import OPENAI_API_KEY
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
from PIL import Image
import complexify;
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Function to read descriptions from CSV
openai.api_key = OPENAI_API_KEY



@app.route('/process-image', methods=['POST'])
@cross_origin()
def process_image():
    try:
        # Decode the JSON payload
        base64_image = request.json

        # Decode the base64 image
        image_data = base64.b64decode(base64_image)
        print(image_data)
        temp_image_path = "temp_image.png"  # Path where the image will be saved
        with Image.open(BytesIO(image_data)) as img:
            print(img)
            # Save the image temporarily
            img.save(temp_image_path)

        # Run complexify.py's main method with the image path
        complexify.main(temp_image_path)

        main()
        
        # app.main(temp_image_path)  # Uncomment and use if needed

        return jsonify({"message": "Image processed successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route('/process', methods=['GET'])
def process_file():
    # Implement logic to trigger processing
    # Example: main()
    return jsonify({"hello": "world"}), 200
    pass

@app.route('/results', methods=['GET'])
def get_results():
    # Implement logic to send back results from output.csv
    pass

def read_description_from_csv(output_csv):
    descriptions = []
    with open(output_csv, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            descriptions.append(row['Description'])
    return descriptions

# Function to interact with ChatGPT
def generate_response(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# Main function
def generate_image(prompt):
    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,  # Number of images to generate
            size="1024x1024"  # Image size
        )
        return response['data'][0]['url']  # Returns the URL of the generated image
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

def main():
    csv_file_path = 'output.csv'  # Replace with your actual CSV file path
    descriptions = read_description_from_csv(csv_file_path)
    for desc in descriptions:
        chat_response = generate_response("Ask the user if the image is " + desc)
        image_url = generate_image(desc)
        print(f"Prompt: {desc}\nChatGPT Response: {chat_response}\nGenerated Image URL: {image_url}\n")

if __name__ == "__main__":
    main()
