
vpc_name              = "autopilot-vpc"
cidr_block            = "10.0.0.0/16"
public_subnet_count   = 2
public_subnet_cidrs   = ["10.0.1.0/24", "10.0.2.0/24"]
availability_zones    = ["us-east-1a", "us-east-1b"]

security_group_name   = "autopilot"

security_group_name_ecs_lb = "autopilot-lb"

lb_name               = "autopilot-lb"
target_group_name     = "autopilot-tg"

family                = "autopilot-TASK"
container_definitions = [
  {
    name      = "autopilot-container",
    image     = "637423460178.dkr.ecr.us-east-1.amazonaws.com/autopilot",
    cpu       = 256,
    memory    = 512,
    essential = true,
    portMappings = [
      {
        containerPort = 3000,
        hostPort      = 3000,
        protocol      = "tcp"
      }
    ],
    environmentFiles = [
      {
        type  = "s3",
        value = "arn:aws:s3:::autopilot0178/.env"
      }
    ],
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        awslogs-group         = "/ecs/",
        awslogs-create-group  = "true",
        awslogs-region        = "us-east-1",
        awslogs-stream-prefix = "ecs"
        
      }
    }
  }
]

cpu                  = "256"
memory               = "512"
execution_role_arn   = "arn:aws:iam::637423460178:role/ecsTaskExecutionRole"
task_role_arn        = "arn:aws:iam::637423460178:role/ecsTaskExecutionRole"

cluster_name         = "autopilot-ecs-app"
service_name         = "autopilot-service"
container_name       = "autopilot-container"
container_port       = 3000


