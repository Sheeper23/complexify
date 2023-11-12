## Complexify

With the upbringing of AI, it becomes apparent of its benefits and how it can be used for inspiration. With the recent addition of DALLE-3, the art scene has become revolutionary with millions attempting to create all types of imagery for fun. Such a technology can become extremely beneficial to young children who wish to test their creativity. Complexify wishes to take the drawings of these aspiring artists and turn them into more complicated crafts in order to inspire these children to see potential in what they create and expand their horizons.

Complexify provides a drawing pad which allows the user to draw any image they want. Once they are done, the AI processes the image and makes a guess as to what it is, and the user will indicate if it was right or wrong. If right, the AI will generate a more complex version of their drawing, and if wrong, it will generate a complex version of the user's correction description.


# Running locally
Install required pip packages and node modules\
Ensure axios post requests in `Canvas.tsx` and `page.tsx` point to `http://127.0.0.1:5000/` as the main domain\
Create a `config.py` in the `backend` directory with contents:
```python
OPENAI_API_KEY = "<your API key>"
```
Run the following from the `backend` directory
```bash
flask run
```
Run the following from the `frontend` directory
```bash
npm run dev
```
Visit `http://localhost:3000/`