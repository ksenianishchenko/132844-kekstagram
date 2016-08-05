function getMessage(a,b) {
    if(typeof a === 'boolean') {        
        return a ? 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров' : 'Переданное GIF-изображение не анимировано';
    }
    
    if(typeof a === 'number') {
        return ('Переданное SVG-изображение содержит ' + a + ' объектов и ' + b*4 + ' атрибутов');
    }
    
    if(Array.isArray(a)) {
        if (!Array.isArray(b)) {
            var amountOfRedPoints = 0;
            for(var i = 0; i < a.length; i++) {
                amountOfRedPoints = amountOfRedPoints + a[i];
            }
            return ('Количество красных точек во всех строчках изображения: ' + amountOfRedPoints);
        }
        
        var maxsteps= a.length; 
        var artifactsSquare = 0;
        if(a.length > b.length) {
            maxsteps = b.length;
        }
        for(var i = 0; i < maxsteps; i++) {
                artifactsSquare = artifactsSquare + (a[i]*b[i]);
        }
        return ('Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей');
    }
};