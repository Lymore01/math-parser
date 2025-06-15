import chalk from "chalk";

export const showNotes = () => {
  console.log(chalk.green.bold("\n📘 Welcome to MathParser Notes\n"));

  const notes = [
    {
      title: "1. What is a Parser?",
      content: `A parser takes a sequence of tokens and builds an abstract syntax tree (AST).\nIn our case, it evaluates math expressions using a structure called recursive descent parsing.`,
    },
    {
      title: "2. Tokenizing (Lexing)",
      content: `Before parsing, we convert the raw string (e.g., "2 + 3") into tokens.\nExample: "2+3" → [{type: NUMBER, value: "2"}, {type: "+", value: "+"}, {type: NUMBER, value: "3"}]`,
    },
    {
      title: "3. Recursive Descent Parsing",
      content: `We define parseExpr, parseTerm, and parseFactor to follow math precedence:\n- parseExpr → handles + and -\n- parseTerm → handles * and /\n- parseFactor → handles numbers and (expr)`,
    },
    {
      title: "4. Precedence Handling",
      content: `By calling parseFactor from parseTerm, and parseTerm from parseExpr,\nwe ensure operators like * and / bind tighter than + and -.`,
    },
    {
      title: "5. AST Representation",
      content: `AST is a tree showing how operations group together.\nExample: (2 + 3) * 4 → BinaryExpr(*, BinaryExpr(+, 2, 3), 4)`,
    },
  ];

  for (const note of notes) {
    console.log(chalk.yellow.bold(`\n${note.title}`));
    console.log(chalk.white(note.content));
  }

  console.log(chalk.cyan("\n👈 Press Ctrl+C to exit or restart the tool to try another mode.\n"));
};
