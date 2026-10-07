/**
 * review-probe: ocr 增量链路验证探针 (验证后删除)。
 * 故意包含可被审查发现的小问题, 用于确认增量窗口真的在工作。
 */
export const probeVersion = '1.0';

export function unusedProbeHelper(): string {
  return probeVersion;
}
