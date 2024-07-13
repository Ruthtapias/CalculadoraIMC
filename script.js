// script.js

document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const exerciseHours = parseFloat(document.getElementById('exercise').value);
    const goal = document.getElementById('goal').value;

    if (age && height && weight && exerciseHours >= 0) {
        const bmi = calculateBMI(height, weight);
        const result = `Tu IMC es: ${bmi.toFixed(2)}`;
        const recommendations = generateRecommendations(bmi, age, exerciseHours, goal);

        document.getElementById('result').textContent = result;
        document.getElementById('recommendations').textContent = recommendations;

        saveBmiHistory(age, height, weight, exerciseHours, bmi);
    } else {
        alert('Por favor, ingresa todos los campos correctamente.');
    }
});

function calculateBMI(height, weight) {
    return weight / ((height / 100) ** 2);
}

function generateRecommendations(bmi, age, exerciseHours, goal) {
    let recommendations = '';

    if (bmi < 18.5) {
        recommendations = 'Estás bajo de peso.';
        if (goal === 'lose-weight') {
            recommendations += ' Es importante que entiendas que ya te encuentras en un peso muy bajo, bajar más traería consecuencias muy negativas a tu salud, por ende la recomendación es que por el contrario busques subir de peso de manera saludable, comiendo buena cantidad de proteínas, vegetales, carbohidratos y grasas, que aumentes tu ingesta de calorías de forma gradual hasta llegar a un peso en el que tu Índice de Masa Corporal este sobre 18.5 puntos.';
        } else if (goal === 'gain-muscle') {
            recommendations += ' Si quieres aumentar tu masa muscular es fundamental aumentar tu ingesta calórica, la ingesta de proteínas de buena calidad, la ingesta de vegetales que proporcionen zinc y magnesio, aumentar la ingesta de grasas buenas contenidas en el aguacate por ejemplo, recuerda que todo en exceso es malo, por ende llevar un equilibrio en la dieta diaria será esencial para tu objetivo.';
        } else if (goal === 'maintain-weight') {
            recommendations += ' Asegúrate de mantener una dieta balanceada para conservar tu peso actual y realiza ejercicio regularmente para mantener tu salud.';
        } else if (goal === 'gain-weight') {
            recommendations += ' Para aumentar de peso de manera saludable, incrementa tu ingesta calórica consumiendo alimentos que proporcionen proteína, calorías, grasas y carbohidratos de forma equilibrada y realiza ejercicio regular, incluyendo entrenamientos de fuerza.';
        }
    } else if (bmi >= 18.5 && bmi < 24.9) {
        recommendations = 'Tienes un peso saludable. Mantén una dieta equilibrada y una rutina de ejercicios regular para conservar tu salud.';
        if (goal === 'lose-weight') {
            recommendations += ' Si decides perder peso, debes tener en cuenta que en el momento tu IMC esta en un nivel adecuado, por lo que perder peso podría bajarlo a niveles no adecuados, por lo que la recomendación es mantener tu peso actual, si el caso es que tu forma física no  es la adecuada, se recomienda hacer ejercicio cardiovascular y con pesas para mantener una buena salud, si por otro lado es cuestión estética, intenta hacer ejercicio para lograr ese cambio que buscas.';
        } else if (goal === 'gain-weight') {
            recommendations += ' Si decides aumentar de peso, busca una dieta balanceada y aumenta la actividad física según sea necesario.';
        } else if (goal === 'gain-muscle') {
            recommendations += ' Enfócate en una dieta rica en proteínas y realiza entrenamientos de fuerza para maximizar el crecimiento muscular.';
        }
    } else if (bmi >= 25) {
        recommendations = 'Tienes sobrepeso. Considera hacer ajustes en tu dieta y aumentar tu nivel de actividad física.';
        if (goal === 'lose-weight') {
            recommendations += ' Para perder peso, es recomendable reducir la ingesta de grasas y calorías, y aumentar la cantidad de ejercicio físico.';
        } else if (goal === 'gain-weight') {
            recommendations += ' Si tu objetivo es aumentar de peso, primero considera si es necesario. Aunque técnicamente puedes aumentar de peso, es más saludable enfocarte en perder grasa y mantener o aumentar la masa muscular magra mediante ejercicio y una dieta adecuada.';
        } else if (goal === 'gain-muscle') {
            recommendations += ' Enfócate en una dieta alta en proteínas magras y realiza entrenamientos de fuerza para ayudar a cambiar la composición de tu cuerpo.';
        } else if (goal === 'maintain-weight') {
            recommendations += ' Mantener el peso en un rango saludable es importante para reducir el riesgo de enfermedades relacionadas con la obesidad. Considera que estas en sobrepeso y puede ser un riesgo para tu salud, si ese sobrepeso se debe a un exceso de consumo de calorías, carbohidratos, grasas a una vida muy sedentaria, se recomienda cambiar tales hábitos mejorando la dieta para bajar la ingesta calórica y buscar bajar a un peso más saludable, si por el contrario no consideras que es por un consumo excesivo de calorías o poca actividad física, debes consultar a tu médico, podría ser un problema hormonal u otro.';
        }
    }

     // Limitación de horas de ejercicio
    if (exerciseHours > 2.5) {
        recommendations += ' Limita tu ejercicio a un máximo de 2.5 horas diarias para evitar fatiga extrema y mejorar los resultados.';
    } else if (exerciseHours === 0) {
        recommendations += ' Parece que tienes un nivel bajo de actividad física. Intenta incorporar al menos 30 minutos de actividad física moderada la mayoría de los días de la semana para mejorar tu salud.';
    } else if (exerciseHours < 1) {
        recommendations += ' Intenta incrementar gradualmente la cantidad de ejercicio para mejorar tu salud general.';
    } else {
        recommendations += ` Asegúrate de mantener al menos ${exerciseHours} horas de ejercicio al día para apoyar tu objetivo de salud.`;
    }

    return recommendations;
}

function saveBmiHistory(age, height, weight, exerciseHours, bmi) {
    const bmiHistory = document.getElementById('bmi-history');
    const listItem = document.createElement('li');
    listItem.textContent = `Edad: ${age} años, Altura: ${height} cm, Peso: ${weight} kg, Horas de ejercicio al día: ${exerciseHours}, IMC: ${bmi.toFixed(2)}`;
    bmiHistory.appendChild(listItem);
}
// En tu archivo JavaScript (ej. script.js)
let ratings = [];
let averageRating = 0;

function rateRecommendation() {
    const ratingInput = document.getElementById('rating');
    const ratingValue = parseInt(ratingInput.value);

    // Validar que la calificación esté entre 1 y 5
    if (ratingValue >= 1 && ratingValue <= 5) {
        ratings.push(ratingValue);
        calculateAverageRating();
        showRatingInfo();
        alert('¡Gracias por tu calificación!');
    } else {
        alert('Por favor, ingresa una calificación válida entre 1 y 5.');
    }

    // Limpiar el campo de calificación después de cada entrada
    ratingInput.value = '';
}

function calculateAverageRating() {
    let total = 0;
    for (let i = 0; i < ratings.length; i++) {
        total += ratings[i];
    }
    averageRating = total / ratings.length;
}

function showRatingInfo() {
    const ratingInfo = document.getElementById('rating-info');
    ratingInfo.innerHTML = `Promedio de calificación: ${averageRating.toFixed(1)} (${ratings.length} votos)`;
}