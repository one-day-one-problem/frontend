import { ApiResponse, PageInfo } from "./api";

/**
 * 문제 카테고리 데이터 타입
 */
export enum ProblemCategory {
  // Operating System
  PROCESS = "PROCESS",
  THREAD = "THREAD",
  DEADLOCK = "DEADLOCK",
  SYNCHRONIZATION = "SYNCHRONIZATION",
  MEMORY_MANAGEMENT = "MEMORY_MANAGEMENT",
  VIRTUAL_MEMORY = "VIRTUAL_MEMORY",
  PAGING = "PAGING",
  SCHEDULING = "SCHEDULING",

  // Network
  OSI_MODEL = "OSI_MODEL",
  TCP_IP = "TCP_IP",
  UDP = "UDP",
  HTTP = "HTTP",
  WEBSOCKET = "WEBSOCKET",
  DNS = "DNS",
  LOAD_BALANCING = "LOAD_BALANCING",
  CORS = "CORS",
  REST = "REST",
  GRAPHQL = "GRAPHQL",

  // Database
  ACID = "ACID",
  TRANSACTION = "TRANSACTION",
  ISOLATION_LEVEL = "ISOLATION_LEVEL",
  LOCK = "LOCK",
  INDEX = "INDEX",
  NORMALIZATION = "NORMALIZATION",
  JOIN = "JOIN",
  MYSQL = "MYSQL",
  POSTGRESQL = "POSTGRESQL",
  MONGODB = "MONGODB",
  REDIS = "REDIS",
  ELASTICSEARCH = "ELASTICSEARCH",

  // Backend - Java/Spring
  JAVA_COLLECTION = "JAVA_COLLECTION",
  JAVA_STREAM = "JAVA_STREAM",
  JAVA_CONCURRENT = "JAVA_CONCURRENT",
  JVM = "JVM",
  GARBAGE_COLLECTION = "GARBAGE_COLLECTION",
  SPRING_IOC = "SPRING_IOC",
  SPRING_AOP = "SPRING_AOP",
  SPRING_TRANSACTION = "SPRING_TRANSACTION",
  JPA_PERSISTENCE = "JPA_PERSISTENCE",
  SPRING_SECURITY = "SPRING_SECURITY",

  // Backend - Python
  PYTHON_GIL = "PYTHON_GIL",
  PYTHON_GENERATOR = "PYTHON_GENERATOR",
  PYTHON_ASYNC = "PYTHON_ASYNC",
  FASTAPI = "FASTAPI",
  DJANGO_ORM = "DJANGO_ORM",

  // JavaScript/TypeScript
  JAVASCRIPT_CLOSURE = "JAVASCRIPT_CLOSURE",
  JAVASCRIPT_PROTOTYPE = "JAVASCRIPT_PROTOTYPE",
  JAVASCRIPT_EVENT_LOOP = "JAVASCRIPT_EVENT_LOOP",
  JAVASCRIPT_PROMISE = "JAVASCRIPT_PROMISE",
  JAVASCRIPT_ASYNC = "JAVASCRIPT_ASYNC",
  TYPESCRIPT_TYPE = "TYPESCRIPT_TYPE",

  // Frontend
  REACT_LIFECYCLE = "REACT_LIFECYCLE",
  REACT_HOOKS = "REACT_HOOKS",
  REACT_STATE = "REACT_STATE",
  NEXT_JS = "NEXT_JS",
  BROWSER_RENDERING = "BROWSER_RENDERING",
  WEB_PERFORMANCE = "WEB_PERFORMANCE",

  // DevOps
  DOCKER = "DOCKER",
  KUBERNETES = "KUBERNETES",
  CI_CD = "CI_CD",
  JENKINS = "JENKINS",
  AWS_EC2 = "AWS_EC2",
  AWS_S3 = "AWS_S3",
  AWS_RDS = "AWS_RDS",
  MONITORING = "MONITORING",
  LOGGING = "LOGGING",

  // Architecture & Design
  DESIGN_PATTERN = "DESIGN_PATTERN",
  SOLID = "SOLID",
  DDD = "DDD",
  MSA = "MSA",
  CQRS = "CQRS",
  EVENT_SOURCING = "EVENT_SOURCING",

  // Security
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  JWT = "JWT",
  OAUTH = "OAUTH",
  XSS = "XSS",
  CSRF = "CSRF",
  SQL_INJECTION = "SQL_INJECTION",

  // Computer Science
  DATA_STRUCTURE = "DATA_STRUCTURE",
  SORTING_ALGORITHM = "SORTING_ALGORITHM",
  GRAPH_ALGORITHM = "GRAPH_ALGORITHM",
  DYNAMIC_PROGRAMMING = "DYNAMIC_PROGRAMMING",
  COMPLEXITY = "COMPLEXITY",
  HASH = "HASH",
  TREE = "TREE",
  DISTRIBUTED_SYSTEM = "DISTRIBUTED_SYSTEM",
}

/**
 * 문제 카테고리에 대응되는 한글 레이블
 */
export const CATEGORY_LABELS: Record<ProblemCategory, string> = {
  // Operating System
  [ProblemCategory.PROCESS]: "프로세스",
  [ProblemCategory.THREAD]: "스레드",
  [ProblemCategory.DEADLOCK]: "데드락",
  [ProblemCategory.SYNCHRONIZATION]: "동기화",
  [ProblemCategory.MEMORY_MANAGEMENT]: "메모리 관리",
  [ProblemCategory.VIRTUAL_MEMORY]: "가상 메모리",
  [ProblemCategory.PAGING]: "페이징",
  [ProblemCategory.SCHEDULING]: "스케줄링",

  // Network
  [ProblemCategory.OSI_MODEL]: "OSI 7계층",
  [ProblemCategory.TCP_IP]: "TCP/IP",
  [ProblemCategory.UDP]: "UDP",
  [ProblemCategory.HTTP]: "HTTP/HTTPS",
  [ProblemCategory.WEBSOCKET]: "웹소켓",
  [ProblemCategory.DNS]: "DNS",
  [ProblemCategory.LOAD_BALANCING]: "로드밸런싱",
  [ProblemCategory.CORS]: "CORS",
  [ProblemCategory.REST]: "REST",
  [ProblemCategory.GRAPHQL]: "GraphQL",

  // Database
  [ProblemCategory.ACID]: "ACID",
  [ProblemCategory.TRANSACTION]: "트랜잭션",
  [ProblemCategory.ISOLATION_LEVEL]: "격리수준",
  [ProblemCategory.LOCK]: "락",
  [ProblemCategory.INDEX]: "인덱스",
  [ProblemCategory.NORMALIZATION]: "정규화",
  [ProblemCategory.JOIN]: "조인",
  [ProblemCategory.MYSQL]: "MySQL",
  [ProblemCategory.POSTGRESQL]: "PostgreSQL",
  [ProblemCategory.MONGODB]: "MongoDB",
  [ProblemCategory.REDIS]: "Redis",
  [ProblemCategory.ELASTICSEARCH]: "Elasticsearch",

  // Backend - Java/Spring
  [ProblemCategory.JAVA_COLLECTION]: "Java 컬렉션",
  [ProblemCategory.JAVA_STREAM]: "Java 스트림",
  [ProblemCategory.JAVA_CONCURRENT]: "Java 동시성",
  [ProblemCategory.JVM]: "JVM",
  [ProblemCategory.GARBAGE_COLLECTION]: "가비지 컬렉션",
  [ProblemCategory.SPRING_IOC]: "스프링 IoC",
  [ProblemCategory.SPRING_AOP]: "스프링 AOP",
  [ProblemCategory.SPRING_TRANSACTION]: "스프링 트랜잭션",
  [ProblemCategory.JPA_PERSISTENCE]: "JPA 영속성",
  [ProblemCategory.SPRING_SECURITY]: "스프링 시큐리티",

  // Backend - Python
  [ProblemCategory.PYTHON_GIL]: "Python GIL",
  [ProblemCategory.PYTHON_GENERATOR]: "Python 제너레이터",
  [ProblemCategory.PYTHON_ASYNC]: "Python 비동기",
  [ProblemCategory.FASTAPI]: "FastAPI",
  [ProblemCategory.DJANGO_ORM]: "Django ORM",

  // JavaScript/TypeScript
  [ProblemCategory.JAVASCRIPT_CLOSURE]: "클로저",
  [ProblemCategory.JAVASCRIPT_PROTOTYPE]: "프로토타입",
  [ProblemCategory.JAVASCRIPT_EVENT_LOOP]: "이벤트 루프",
  [ProblemCategory.JAVASCRIPT_PROMISE]: "프로미스",
  [ProblemCategory.JAVASCRIPT_ASYNC]: "비동기 프로그래밍",
  [ProblemCategory.TYPESCRIPT_TYPE]: "타입스크립트 타입 시스템",

  // Frontend
  [ProblemCategory.REACT_LIFECYCLE]: "React 생명주기",
  [ProblemCategory.REACT_HOOKS]: "React Hooks",
  [ProblemCategory.REACT_STATE]: "React 상태관리",
  [ProblemCategory.NEXT_JS]: "Next.js",
  [ProblemCategory.BROWSER_RENDERING]: "브라우저 렌더링",
  [ProblemCategory.WEB_PERFORMANCE]: "웹 성능최적화",

  // DevOps
  [ProblemCategory.DOCKER]: "Docker",
  [ProblemCategory.KUBERNETES]: "Kubernetes",
  [ProblemCategory.CI_CD]: "CI/CD",
  [ProblemCategory.JENKINS]: "Jenkins",
  [ProblemCategory.AWS_EC2]: "AWS EC2",
  [ProblemCategory.AWS_S3]: "AWS S3",
  [ProblemCategory.AWS_RDS]: "AWS RDS",
  [ProblemCategory.MONITORING]: "모니터링",
  [ProblemCategory.LOGGING]: "로깅",

  // Architecture & Design
  [ProblemCategory.DESIGN_PATTERN]: "디자인패턴",
  [ProblemCategory.SOLID]: "SOLID 원칙",
  [ProblemCategory.DDD]: "도메인 주도 설계",
  [ProblemCategory.MSA]: "마이크로서비스",
  [ProblemCategory.CQRS]: "CQRS",
  [ProblemCategory.EVENT_SOURCING]: "이벤트소싱",

  // Security
  [ProblemCategory.AUTHENTICATION]: "인증",
  [ProblemCategory.AUTHORIZATION]: "인가",
  [ProblemCategory.JWT]: "JWT",
  [ProblemCategory.OAUTH]: "OAuth",
  [ProblemCategory.XSS]: "XSS",
  [ProblemCategory.CSRF]: "CSRF",
  [ProblemCategory.SQL_INJECTION]: "SQL 인젝션",

  // Computer Science
  [ProblemCategory.DATA_STRUCTURE]: "자료구조",
  [ProblemCategory.SORTING_ALGORITHM]: "정렬 알고리즘",
  [ProblemCategory.GRAPH_ALGORITHM]: "그래프 알고리즘",
  [ProblemCategory.DYNAMIC_PROGRAMMING]: "동적 프로그래밍",
  [ProblemCategory.COMPLEXITY]: "시간/공간 복잡도",
  [ProblemCategory.HASH]: "해시",
  [ProblemCategory.TREE]: "트리",
  [ProblemCategory.DISTRIBUTED_SYSTEM]: "분산시스템",
};

/**
 * 문제 난이도 데이터 타입
 */
export enum ProblemDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

/**
 * 문제 난이도에 대응되는 한글 레이블
 */
export const DIFFICULTY_LABELS: Record<ProblemDifficulty, string> = {
  [ProblemDifficulty.EASY]: "입문",
  [ProblemDifficulty.MEDIUM]: "중급",
  [ProblemDifficulty.HARD]: "고급",
};

/**
 * 문제 유형 데이터 타입
 */
export enum ProblemType {
  SUBJECTIVE = "SUBJECTIVE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}

/**
 * 문제 유형에 대응되는 한글 레이블
 */
export const TYPE_LABELS: Record<ProblemType, string> = {
  [ProblemType.SUBJECTIVE]: "주관식",
  [ProblemType.MULTIPLE_CHOICE]: "객관식",
};

/**
 * 문제 정렬 데이터 타입
 */
export enum ProblemSortType {
  LATEST = "LATEST",
  OLDEST = "OLDEST",
  MOST_SOLVED = "MOST_SOLVED",
  LEAST_SOLVED = "LEAST_SOLVED",
}

/**
 * 문제 요약 정보
 *
 * 문제 목록에서 각 문제의 기본 정보를 나타낸다.
 *
 * @property id - 문제 고유 식별자
 * @property title - 문제 제목
 * @property category - 문제 카테고리
 * @property difficulty - 문제 난이도
 * @property type - 문제 유형(주관식, 객관식)
 * @property solvedCount - 문제를 해결한 사용자 수
 * @property isSolved - 현재 로그인한 사용자의 해결 여부(인증된 사용자만 해당)
 */
export interface ProblemSummary {
  id: number;
  title: string;
  category: ProblemCategory;
  difficulty: ProblemDifficulty;
  type: ProblemType;
  solvedCount: number;
  isSolved?: boolean; // 인증된 사용자의 경우에만 포함됨
}

/**
 * 문제 목록 페이지 응답 인터페이스
 *
 * 페이징 처리된 문제 목록과 관련 메타데이터를 포함한다.
 *
 * @extends PageInfo - 페이지네이션 공통 정보 상속
 * @property problems - 현재 페이지에 포함된 문제 요약 목록
 * @property currentPage - 현재 페이지 번호 (0부터 시작)
 * @property pageSize - 페이지당 문제 수
 * @property totalPages - 전체 페이지 수
 * @property totalElements - 조건에 맞는 전체 문제 수
 * @property numberOfElements - 현재 페이지에 포함된 문제 수
 * @property hasNext - 다음 페이지 존재 여부
 * @property hasPrevious - 이전 페이지 존재 여부
 * @property empty - 현재 페이지가 비어있는지 여부
 */
export interface ProblemPage extends PageInfo {
  problems: ProblemSummary[];
}

/**
 * 문제 목록 API (GET /api/problems) 응답 데이터 타입
 */
export type ProblemListResponse = ApiResponse<ProblemPage>;

////////////////////////////////////////

/**
 * 문제 옵션 데이터 타입
 *
 * 객관식 문제의 선택지를 나타낸다.
 *
 * @property id - 선택지 고유 식별자
 * @property content - 선택지 내용
 */
export interface ProblemOption {
  id: number;
  content: string;
}

/**
 * 문제 상세 정보
 *
 * 문제의 상세 정보를 나타낸다.
 *
 * @property id - 문제 고유 식별자
 * @property title - 문제 제목
 * @property question - 문제 내용
 * @property category - 문제 카테고리
 * @property difficulty - 문제 난이도
 * @property type - 문제 유형(주관식, 객관식)
 * @property solvedCount - 문제를 해결한 사용자 수
 * @property isSolved - 현재 로그인한 사용자의 해결 여부(인증된 사용자만 해당)
 * @property options - 객관식 문제의 선택지 목록
 */
export interface Problem {
  id: number;
  title: string;
  question: string;
  category: ProblemCategory;
  difficulty: ProblemDifficulty;
  type: ProblemType;
  solvedCount: number;
  isSolved?: boolean;
  options?: ProblemOption[];
}

/**
 * 문제 상세 API (GET /api/problems/{id}) 응답 데이터 타입
 */
export interface ProblemResponse extends ApiResponse<Problem> {}
