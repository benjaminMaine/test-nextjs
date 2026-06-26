#!/bin/bash
# skills-dashboard.sh

GLOBAL_DIR="$HOME/.claude/skills"
PROJECT_DIR=".claude/skills"

echo "╔════════════════════════════════════════╗"
echo "║      YOUR CLAUDE SKILLS DASHBOARD      ║"
echo "╚════════════════════════════════════════╝"
echo ""

GLOBAL_COUNT=$(ls -1 "$GLOBAL_DIR" 2>/dev/null | wc -l | tr -d ' ')
PROJECT_COUNT=$(ls -1 "$PROJECT_DIR" 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Summary:"
echo "  • Global skills (~/.claude/skills): $GLOBAL_COUNT"
echo "  • Project skills (.claude/skills):  $PROJECT_COUNT"
echo ""

echo "🌍 Global Skills:"
for skill in "$GLOBAL_DIR"/*/; do
  skill_name=$(basename "$skill")
  if [ -f "$skill/SKILL.md" ]; then
    desc=$(grep "^description:" "$skill/SKILL.md" | sed 's/description: //' | cut -c1-60)
    echo "  ✓ $skill_name"
    [ -n "$desc" ] && echo "    → $desc"
  fi
done
echo ""

echo "📁 Project Skills (.claude/skills):"
for skill in "$PROJECT_DIR"/*/; do
  [ -d "$skill" ] || continue
  skill_name=$(basename "$skill")
  if [ -f "$skill/SKILL.md" ]; then
    desc=$(grep "^description:" "$skill/SKILL.md" | sed 's/description: //' | cut -c1-60)
    if [ -L "$skill" ]; then
      echo "  ↗ $skill_name (symlink → global)"
    else
      echo "  ✓ $skill_name (project-specific)"
    fi
    [ -n "$desc" ] && echo "    → $desc"
  fi
done
echo ""

echo "💡 Usage: /skill-name in any Claude Code session"
