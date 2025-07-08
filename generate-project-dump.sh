#!/bin/bash

# Generate a comprehensive project dump for AI platforms
OUTPUT_FILE="project-dump.txt"

echo "# R3F Portfolio Project Dump" > $OUTPUT_FILE
echo "Generated on: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "## Project Structure" >> $OUTPUT_FILE
echo "\`\`\`" >> $OUTPUT_FILE
tree -I 'node_modules|.git|.next|dist|build|coverage' -a --dirsfirst >> $OUTPUT_FILE 2>/dev/null || find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.css" -o -name "*.scss" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" | sort >> $OUTPUT_FILE
echo "\`\`\`" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "## Package Configuration" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Add package.json
if [ -f "package.json" ]; then
    echo "### package.json" >> $OUTPUT_FILE
    echo "\`\`\`json" >> $OUTPUT_FILE
    cat package.json >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

# Add tsconfig.json
if [ -f "tsconfig.json" ]; then
    echo "### tsconfig.json" >> $OUTPUT_FILE
    echo "\`\`\`json" >> $OUTPUT_FILE
    cat tsconfig.json >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

# Add next.config.ts
if [ -f "next.config.ts" ]; then
    echo "### next.config.ts" >> $OUTPUT_FILE
    echo "\`\`\`typescript" >> $OUTPUT_FILE
    cat next.config.ts >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

# Add tailwind.config.ts
if [ -f "tailwind.config.ts" ]; then
    echo "### tailwind.config.ts" >> $OUTPUT_FILE
    echo "\`\`\`typescript" >> $OUTPUT_FILE
    cat tailwind.config.ts >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

echo "## Source Files" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Function to process files
process_file() {
    local file="$1"
    local extension="${file##*.}"
    
    echo "### $file" >> $OUTPUT_FILE
    
    case $extension in
        tsx|ts)
            echo "\`\`\`typescript" >> $OUTPUT_FILE
            ;;
        js|jsx)
            echo "\`\`\`javascript" >> $OUTPUT_FILE
            ;;
        css|scss)
            echo "\`\`\`css" >> $OUTPUT_FILE
            ;;
        json)
            echo "\`\`\`json" >> $OUTPUT_FILE
            ;;
        md)
            echo "\`\`\`markdown" >> $OUTPUT_FILE
            ;;
        *)
            echo "\`\`\`" >> $OUTPUT_FILE
            ;;
    esac
    
    cat "$file" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
}

# Process all source files in order
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.scss" \) \
    -not -path "./node_modules/*" \
    -not -path "./.git/*" \
    -not -path "./.next/*" \
    -not -path "./dist/*" \
    -not -path "./build/*" | \
    sort | \
    while read file; do
        process_file "$file"
    done

echo "Project dump generated: $OUTPUT_FILE"
echo "File size: $(wc -c < $OUTPUT_FILE) bytes"
echo "Line count: $(wc -l < $OUTPUT_FILE) lines"
