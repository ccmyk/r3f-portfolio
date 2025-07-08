#!/bin/bash

# Generate an XML-based project dump for AI platforms (like Claude)
OUTPUT_FILE="project-dump-xml.txt"

echo "# R3F Portfolio Project - XML Format" > $OUTPUT_FILE
echo "Generated on: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "<project name=\"r3f-portfolio\" type=\"next.js-typescript-react-three-fiber\">" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "<metadata>" >> $OUTPUT_FILE
echo "  <description>Creative portfolio built with Next.js, React Three Fiber, Framer Motion, and Tailwind CSS</description>" >> $OUTPUT_FILE
echo "  <tech-stack>" >> $OUTPUT_FILE
echo "    <framework>Next.js 15</framework>" >> $OUTPUT_FILE
echo "    <language>TypeScript</language>" >> $OUTPUT_FILE
echo "    <ui>React 19</ui>" >> $OUTPUT_FILE
echo "    <webgl>React Three Fiber</webgl>" >> $OUTPUT_FILE
echo "    <animation>Framer Motion</animation>" >> $OUTPUT_FILE
echo "    <styling>Tailwind CSS</styling>" >> $OUTPUT_FILE
echo "    <cms>Payload CMS</cms>" >> $OUTPUT_FILE
echo "  </tech-stack>" >> $OUTPUT_FILE
echo "</metadata>" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "<structure>" >> $OUTPUT_FILE
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.css" \) \
    -not -path "./node_modules/*" \
    -not -path "./.git/*" \
    -not -path "./.next/*" | \
    sort | \
    sed 's|^\./||' | \
    while read file; do
        echo "  <file path=\"$file\" />" >> $OUTPUT_FILE
    done
echo "</structure>" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Function to process files with XML format
process_file_xml() {
    local file="$1"
    local extension="${file##*.}"
    local filename=$(basename "$file")
    local directory=$(dirname "$file")
    
    echo "<file path=\"$file\" name=\"$filename\" directory=\"$directory\" type=\"$extension\">" >> $OUTPUT_FILE
    echo "<content><![CDATA[" >> $OUTPUT_FILE
    cat "$file" >> $OUTPUT_FILE
    echo "]]></content>" >> $OUTPUT_FILE
    echo "</file>" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
}

echo "<files>" >> $OUTPUT_FILE

# Process all source files
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) \
    -not -path "./node_modules/*" \
    -not -path "./.git/*" \
    -not -path "./.next/*" \
    -not -path "./dist/*" \
    -not -path "./build/*" | \
    sort | \
    sed 's|^\./||' | \
    while read file; do
        process_file_xml "$file"
    done

echo "</files>" >> $OUTPUT_FILE
echo "</project>" >> $OUTPUT_FILE

echo "XML project dump generated: $OUTPUT_FILE"
echo "File size: $(wc -c < $OUTPUT_FILE) bytes"
