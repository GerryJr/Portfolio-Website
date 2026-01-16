import { icons } from "@/data/icons";
import { SkillCategory } from "@/types/skills";

const languages = [
  icons.python,
  icons.typescript,
  icons.javascript,
  icons.csharp,
  icons.r,
  icons.html,
  icons.css,
  icons.matlab,
] satisfies SkillCategory["languages"];

const frameworks = [
  icons.react,
  icons.pandas,
  icons.numpy,
  icons.nodejs,
  icons.expo,
  icons.bootstrap,
  icons.sqlalchemy,
  icons.flask,
] satisfies SkillCategory["frameworks"];

const cloud = [
  icons.aws,
  icons.googlecloud,
  icons.mongodb,
  icons.supabase,
] satisfies SkillCategory["cloud"];

const tools = [
  icons.pycharm,
  icons.vscode,
  icons.jupyter,
  icons.rstudio,
  icons.git,
  icons.github,
  icons.docker,
  icons.postman,
] satisfies SkillCategory["tools"];

const other = [
  icons.solidworks,
  icons.wix,
] satisfies SkillCategory["other"];

export const skills: SkillCategory = {
  languages,
  frameworks,
  cloud,
  tools,
  other,
};
