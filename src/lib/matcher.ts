// ! DEPRECATED

export default function matcher(token: string, matchCondition: RegExp) {
  return matchCondition.test(token);
}
