from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import logging
import PyPDF2
import io
import re

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CGWA Checker API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_pdf_content(file_content: bytes) -> str:
    """Read PDF content and extract text"""
    try:
        # Create a file-like object from bytes
        pdf_file = io.BytesIO(file_content)
        
        # Create PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Extract text from all pages
        text_content = ""
        for page_num, page in enumerate(pdf_reader.pages):
            text_content += f"\n--- Page {page_num + 1} ---\n"
            text_content += page.extract_text()
            text_content += "\n"
        
        return text_content
    except Exception as e:
        logger.error(f"Error reading PDF: {str(e)}")
        return f"Error reading PDF: {str(e)}"

@app.get("/")
async def root():
    return {"message": "CGWA Checker API is running"}


def parse_grades_from_text(text: str) -> List[dict]:
    """
    Parses grade lines from transcript text and extracts:
    - subject_code
    - subject_desc
    - final_grade
    - units
    """
    grades = []
    lines = text.splitlines()
    
    for line in lines:
        line = line.strip()
        
        # Skip header lines and empty lines
        if not line or 'Subject Code' in line or 'MY GRADES' in line or 'Student' in line or 'TOTAL' in line or 'GENERAL' in line or 'Powered by' in line:
            continue
            
        # Match the actual format: CODE DESCRIPTION Inc FINAL_GRADE UNITS
        # Example: CCDATRCL DATA STRUCTURES AND ALGORITHMS Inc 4.00 3.0
        # Also handles: CODE DESCRIPTION Inc R 3.0 (letter grades)
        match = re.match(r'^([A-Z0-9]+)\s+(.+?)\s+(Inc|[\d.]+)\s+([A-Za-z]+|\d+\.\d{2})\s+(\d+\.\d{1})$', line)
        
        if match:
            subject_code = match.group(1)
            subject_desc = match.group(2).strip()
            midterm_grade = match.group(3)
            final_grade_raw = match.group(4)
            units = float(match.group(5))
            
            # Handle letter grades vs numeric grades
            if final_grade_raw.replace('.', '').isdigit():
                # Numeric grade
                final_grade = float(final_grade_raw)
                grade_type = "numeric"
            else:
                # Letter grade (R, Dr, F, etc.)
                final_grade = final_grade_raw
                grade_type = "letter"
            
            # Skip subjects marked with asterisk (excluded from GWA)
            if '*' not in subject_code and '*' not in subject_desc:
                grades.append({
                    "subject_code": subject_code,
                    "subject_desc": subject_desc,
                    "midterm_grade": midterm_grade,
                    "final_grade": final_grade,
                    "grade_type": grade_type,
                    "units": units
                })
                print(f"Extracted: {subject_code} | {subject_desc} | {midterm_grade} | {final_grade} ({grade_type}) | {units}")
    
    return grades

@app.post("/upload")
async def upload(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    logger.info(f"Received {len(files)} files")
    
    # Log file names for debugging
    file_names = [file.filename for file in files]
    logger.info(f"File names: {file_names}")

    all_grades = []
    
    # Read and process each PDF file
    for file in files:
        if file.content_type != "application/pdf":
            logger.warning(f"Skipping non-PDF file: {file.filename}")
            continue
            
        logger.info(f"Processing PDF file: {file.filename}")
        
        # Read file content
        file_content = await file.read()
        
                # Extract text from PDF
        pdf_text = read_pdf_content(file_content)

        # Parse structured grades
        grades = parse_grades_from_text(pdf_text)

        logger.info(f"Extracted {len(grades)} subjects from {file.filename}")
        
        # Optional: print extracted data
        for g in grades:
            print(f"{g['subject_code']} | {g['subject_desc']} | {g['midterm_grade']} | {g['final_grade']} ({g['grade_type']}) | {g['units']}")
        
        all_grades.extend(grades)
        
        # Print PDF content to console
        print(f"\n{'='*50}")
        print(f"PDF FILE: {file.filename}")
        print(f"{'='*50}")
        print(pdf_text)
        print(f"{'='*50}\n")
        
        logger.info(f"Successfully processed PDF: {file.filename}")
    
    
    # Calculate CGWA: convert letter grades to 0.0 for calculation but keep their units
    total_points = 0
    total_units = 0
    
    for grade in all_grades:
        units = grade["units"]
        total_units += units
        
        if grade["grade_type"] == "numeric":
            total_points += grade["final_grade"] * units
        else:
            # Letter grades (R, Dr, F, etc.) count as 0.0 but units still count
            total_points += 0.0 * units
    
    cgwa = round(total_points / total_units, 3) if total_units > 0 else 0.000
    
    logger.info(f"Calculated CGWA ANG POGI MO ALLEN KURT: {cgwa} (total points: {total_points}, total units: {total_units})")
    return {
        "cgwa": cgwa,
        "files_processed": len(files),
        "subjects_processed": len(all_grades),
        "total_points": total_points,
        "total_units": total_units,
        "grades": all_grades  # Optional: return for debugging
    }