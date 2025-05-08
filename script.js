// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init("YOUR_PUBLIC_KEY");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('kiForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Vielen Dank für deine Antworten! Ich werde mich in Kürze bei dir melden.';
    form.insertBefore(successMessage, form.firstChild);

    // Add character counters for text areas
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textarea => {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/500 Zeichen';
        textarea.parentNode.appendChild(counter);

        textarea.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            counter.textContent = `${this.value.length}/500 Zeichen`;
            if (remaining < 50) {
                counter.style.color = 'var(--error-color)';
            } else {
                counter.style.color = 'var(--text-color)';
            }
        });
    });

    // Handle "Sonstiges" inputs
    const otherInputs = document.querySelectorAll('input[type="radio"][value="sonstiges"], input[type="checkbox"][value="sonstiges"]');
    otherInputs.forEach(input => {
        const otherField = input.parentElement.querySelector('.other-input');
        input.addEventListener('change', function() {
            otherField.disabled = !this.checked;
            if (this.checked) {
                otherField.focus();
            }
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            kiKnowledge: document.querySelector('input[name="kiKnowledge"]:checked')?.value || 'Nicht angegeben',
            goal: document.querySelector('input[name="goal"]:checked')?.value || 'Nicht angegeben',
            goalOther: document.querySelector('input[name="goalOther"]').value,
            workArea: document.getElementById('workArea').value || 'Nicht angegeben',
            tasks: Array.from(document.querySelectorAll('input[name="tasks"]:checked')).map(cb => cb.value),
            tasksOther: document.querySelector('input[name="tasksOther"]').value,
            interests: document.getElementById('interests').value || 'Nicht angegeben',
            concerns: document.getElementById('concerns').value || 'Nicht angegeben',
            learningStyle: document.querySelector('input[name="learningStyle"]:checked')?.value || 'Nicht angegeben',
            additional: document.getElementById('additional').value || 'Nicht angegeben'
        };

        try {
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: formData.name,
                from_email: formData.email,
                to_name: 'Beate',
                to_email: 'roos@ai-and-beyond-consulting.de',
                message: formatEmailContent(formData)
            });

            // Show success message
            successMessage.style.display = 'block';
            form.reset();
            
            // Reset character counters
            document.querySelectorAll('.char-counter').forEach(counter => {
                counter.textContent = '0/500 Zeichen';
                counter.style.color = 'var(--text-color)';
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Error sending email:', error);
            alert('Es gab einen Fehler beim Senden des Formulars. Bitte versuche es später noch einmal.');
        }
    });
});

function formatEmailContent(data) {
    return `
Vorbereitungsformular – Von 0 nach KI

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}

KI-Kenntnisse:
${data.kiKnowledge}

Ziel des Programms:
${data.goal}${data.goalOther ? ` - ${data.goalOther}` : ''}

Arbeitsbereich:
${data.workArea}

KI-Einsatzbereiche:
${data.tasks.length > 0 ? data.tasks.join(', ') : 'Keine ausgewählt'}${data.tasksOther ? ` - ${data.tasksOther}` : ''}

Interessante Tools/Themen:
${data.interests}

Aktuelle Unsicherheiten:
${data.concerns}

Bevorzugter Lernstil:
${data.learningStyle}

Zusätzliche Informationen:
${data.additional}
    `;
} 