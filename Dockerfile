# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM dhi.io/dotnet:8.0-sdk AS build
ARG TARGETARCH
COPY . /reactnet
WORKDIR /reactnet

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && node -v && npm -v

RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM dhi.io/aspnetcore:8.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "reactnet.dll"]




# syntax=docker/dockerfile:1

# FROM --platform=$BUILDPLATFORM dhi.io/dotnet:8.0-sdk AS build
# ARG TARGETARCH
# COPY . /reactnet
# WORKDIR /reactnet

# RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
#     dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

# FROM dhi.io/dotnet:8.0-sdk AS development

# RUN apt-get update && apt-get install -y curl \
#     && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
#     && apt-get install -y nodejs

# COPY . /reactnet
# WORKDIR /reactnet
# CMD dotnet run --no-launch-profile

# FROM dhi.io/aspnetcore:8.0 AS final
# WORKDIR /app
# COPY --from=build /app .
# ENTRYPOINT ["dotnet", "reactnet.dll"]

