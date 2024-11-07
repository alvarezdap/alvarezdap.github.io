# Vamos a crear un script de Python que lea un archivo de texto, divida el texto en oraciones utilizando el punto como delimitador
# y luego guarde cada oración en una nueva línea dentro de un archivo de salida.

def split_text_into_sentences(input_path, output_path):
    """
    Lee un archivo de texto, divide el contenido en oraciones utilizando el punto como delimitador
    y guarda cada oración en una nueva línea en un archivo de salida.

    Parameters:
    input_path (str): Ruta del archivo de texto de entrada.
    output_path (str): Ruta del archivo de texto de salida.
    """
    import re

    with open(input_path, 'r', encoding='utf-8') as file:
        text = file.read()

    # Dividir el texto en oraciones usando el punto como delimitador, manteniendo los signos de puntuación internos.
    text = re.sub(r'\s+', ' ', text)
    sentences = [sentence.strip() for sentence in re.split(r'(?<=[.!?])\s+', text)]

    # Escribir cada oración en una línea nueva en el archivo de salida
    with open(output_path, 'w', encoding='utf-8') as file:
        for sentence in sentences:
            file.write(sentence.strip() + '\n')


# Crear un ejemplo de uso con rutas ficticias para el archivo de entrada y salida.
# Reemplaza 'input.txt' y 'output.txt' con las rutas reales cuando ejecutes el script.
input_file_path = '/Users/andres/Documents/ObsidianMac/SynologyDrive/Bukero/Libros/texts/Originales/2_spanish.txt'  # Cambia esta ruta al archivo de entrada real
output_file_path = '/Users/andres/Documents/ObsidianMac/SynologyDrive/Bukero/Libros/texts/letter2_spanish.txt'  # Cambia esta ruta al archivo de salida real

# Ejecutar la función para dividir el texto y guardar el resultado.
split_text_into_sentences(input_file_path, output_file_path)

output_file_path
