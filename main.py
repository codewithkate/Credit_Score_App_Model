from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class InputData(BaseModel):
    input1: str
    input2: str
    input3: str
    input4: str
    input5: str

@app.post("/process-data/")
async def process_data(data: InputData):
    # You can access the input values as data.input1, data.input2, etc.
    # Perform your processing here
    processed_data = {
        "result": f"Processed {data.input1}, {data.input2}, {data.input3}, {data.input4}, {data.input5}"
    }
    return processed_data
