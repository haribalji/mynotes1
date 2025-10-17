# summarizer.py
import os
import sys
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables (if any)
load_dotenv()

# Configure the API (you may also choose to load the API key from the environment)
# genai.configure(api_key='AIzaSyB0zxlzaUXGX_En1vCLspnZXFq9waUL4a8') 
# backuo api

genai.configure(api_key='AIzaSyB0zxlzaUXGX_En1vCLspnZXFq9waUL4a8')

# genai.configure(api_key='AIzaSyD4DvfGt1M_gok61Jo3AQELmxZ8QIUGcYw')

# Generation configuration for the Gemini model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Create the Gemini model with your desired settings
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config,
)

# Function to summarize text using the Gemini API
def summarize_text(text):
    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
    "Give the output in first in Tamil and English.",
    "There should be a gap between one language and another language.",
    " you should not Use the asterisk (`*`) symbol and highlight important lines in bold letter if needed.",
    "Keep in mind that you're displaying content for school students.",
     "you need summarize the content in short in the  tamil and english",
     "Removes **,--- and other unwanted symbols before displaying" 
     "provide the content in such way that i can dyslexia "
     ,"first tamil content and it's  summary then english content and it's summary"
   ],},])
    response = chat_session.send_message(text)
    return response.text

if __name__ == '__main__':
    # Expect the file path as the first command-line argument
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)
    file_path = sys.argv[1]
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            file_content = f.read()
    except Exception as e:
        print(json.dumps({"error": f"Error reading file: {str(e)}"}))
        sys.exit(1)
    
    # Get the summary from the Gemini model
    summary = summarize_text(file_content)
    # Print the result as a JSON string
    print(json.dumps({"summary": summary}))
    sys.stdout.flush()
    # IT IS LISTENED BY STDOUT NODES.JS







