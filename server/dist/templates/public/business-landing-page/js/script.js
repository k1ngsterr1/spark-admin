document.querySelectorAll('.editable').forEach(element => {
    element.addEventListener('blur', () => {
        const id = element.id;
        let content = element.innerHTML;

        content = content.replace(/\n\s*/g, '');
        content = content.trim();

        fetch(`/api/block/component/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Update successful for', id);
            } else {
                console.log('Update failed for', id);
            }
        })
        .catch(error => {
            console.error('Error updating content for', id, error);
        });
    });
});
