#!/bin/bash

# Generate a comprehensive project dump for AI platforms
OUTPUT_FILE="project-dump.txt"

echo "# R3F Portfolio Project Dump" > $OUTPUT_FILE
echo "Generated on: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "## Project Structure" >> $OUTPUT_FILE
echo "\`\`\`" >> $OUTPUT_FILE
tree -I 'node_modules|.git|.next|dist|build|coverage|pnpm-lock.yaml' -a --dirsfirst >> $OUTPUT_FILE 2>/dev/null || find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.css" -o -name "*.scss" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" | sort >> $OUTPUT_FILE
echo "\`\`\`" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "## Package Configuration" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Add all config files
for config_file in "package.json" "tsconfig.json" "next.config.ts" "tailwind.config.ts" "postcss.config.mjs" "eslint.config.mjs"; do
    if [ -f "$config_file" ]; then
        echo "### $config_file" >> $OUTPUT_FILE
        case "${config_file##*.}" in
            json)
                echo "\`\`\`json" >> $OUTPUT_FILE
                ;;
            ts)
                echo "\`\`\`typescript" >> $OUTPUT_FILE
                ;;
            mjs|js)
                echo "\`\`\`javascript" >> $OUTPUT_FILE
                ;;
        esac
        cat "$config_file" >> $OUTPUT_FILE
        echo "\`\`\`" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    fi
done

# Add payload config specifically
if [ -f "src/payload/payload.config.ts" ]; then
    echo "### src/payload/payload.config.ts" >> $OUTPUT_FILE
    echo "\`\`\`typescript" >> $OUTPUT_FILE
    cat "src/payload/payload.config.ts" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

echo "## Source Files" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Function to process files (your existing function is good)
process_file() {
    local file="$1"
    local extension="${file##*.}"
    
    echo "### $file" >> $OUTPUT_FILE
    
    case $extension in
        tsx|ts)
            echo "\`\`\`typescript" >> $OUTPUT_FILE
            ;;
        js|jsx|mjs)
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
        sh)
            echo "\`\`\`bash" >> $OUTPUT_FILE
            ;;
        *)
            echo "\`\`\`" >> $OUTPUT_FILE
            ;;
    esac
    
    cat "$file" >> $OUTPUT_FILE
    echo "\`\`\`" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
}

# Enhanced find command to include more file types
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.scss" -o -name "*.mjs" \) \
    -not -path "./node_modules/*" \
    -not -path "./.git/*" \
    -not -path "./.next/*" \
    -not -path "./dist/*" \
    -not -path "./build/*" \
    -not -name "pnpm-lock.yaml" \
    -not -name "project-dump*.txt" | \
    sort | \
    while read file; do
        process_file "$file"
    done

echo "Project dump generated: $OUTPUT_FILE"
echo "File size: $(wc -c < $OUTPUT_FILE) bytes"
echo "Line count: $(wc -l < $OUTPUT_FILE) lines"