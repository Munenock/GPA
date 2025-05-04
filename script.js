document.addEventListener('DOMContentLoaded', function() {
    const courseCountInput = document.getElementById('course-count');
    const generateBtn = document.getElementById('generate-btn');
    const coursesForm = document.getElementById('courses-form');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    // Updated grade point values (A-F with 5-0 scale)
    const gradePoints = {
        'A': 5.0,    // 80-100%
        'B+': 4.5,   // 75-79%
        'B': 4.0,    // 70-74%
        'C+': 3.5,   // 65-69%
        'C': 3.0,    // 60-64%
        'D+': 2.5,   // 55-59%
        'D': 2.0,    // 50-54%
        'E': 1.5,    // 45-49%
        'E-': 1.0,   // 40-44%
        'F': 0.0     // Below 40%
    };

    // Generate course input fields
    generateBtn.addEventListener('click', function() {
        const courseCount = parseInt(courseCountInput.value);
        
        if (courseCount < 1) {
            alert('Please enter a valid number of courses (at least 1)');
            return;
        }

        coursesForm.innerHTML = '';
        
        for (let i = 1; i <= courseCount; i++) {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course-input';
            
            courseDiv.innerHTML = `
                <h3>Course Unit ${i}</h3>
                <div class="input-group">
                    <div class="form-control">
                        <label for="course-grade-${i}">Grade</label>
                        <select id="course-grade-${i}" required>
                            <option value="">Select Grade</option>
                            ${Object.keys(gradePoints).map(grade => 
                                `<option value="${grade}">${grade}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="course-credits-${i}">Credit Units</label>
                        <input type="number" id="course-credits-${i}" min="1" step="1" required>
                    </div>
                </div>
            `;
            
            coursesForm.appendChild(courseDiv);
        }
        
        coursesForm.style.display = 'block';
        calculateBtn.style.display = 'block';
        resultDiv.style.display = 'none';
    });

    // Calculate GPA
    calculateBtn.addEventListener('click', function() {
        const courseCount = parseInt(courseCountInput.value);
        let totalQualityPoints = 0;
        let totalCredits = 0;
        let allValid = true;
        
        for (let i = 1; i <= courseCount; i++) {
            const gradeSelect = document.getElementById(`course-grade-${i}`);
            const creditsInput = document.getElementById(`course-credits-${i}`);
            
            if (!gradeSelect.value || !creditsInput.value) {
                allValid = false;
                break;
            }
            
            const grade = gradeSelect.value;
            const credits = parseFloat(creditsInput.value);
            
            totalQualityPoints += gradePoints[grade] * credits;
            totalCredits += credits;
        }
        
        if (!allValid) {
            alert('Please fill in all grade and credit unit fields');
            return;
        }
        
        if (totalCredits === 0) {
            alert('Total credit units cannot be zero');
            return;
        }
        
        const gpa = totalQualityPoints / totalCredits;
        displayResult(gpa);
    });

    // Display the result
    function displayResult(gpa) {
        let gradeDescription = '';
        
        if (gpa >= 4.5) {
            gradeDescription = 'Excellent (First Class)';
        } else if (gpa >= 3.5) {
            gradeDescription = 'Very Good (Second Class Upper)';
        } else if (gpa >= 2.5) {
            gradeDescription = 'Good (Second Class Lower)';
        } else if (gpa >= 1.5) {
            gradeDescription = 'Pass (Third Class)';
        } else {
            gradeDescription = 'Fail';
        }
        
        resultDiv.innerHTML = `
            <h2>Your GPA</h2>
            <div class="gpa-value">${gpa.toFixed(2)}</div>
            <div class="grade-info">${gradeDescription}</div>
        `;
        
        resultDiv.style.display = 'block';
    }
});
